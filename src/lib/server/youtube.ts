// Build-time YouTube feed reader. Uses only public RSS: no API key, no token to renew.
// Every failure returns empty lists so a YouTube hiccup never breaks a deploy.
import { channel, type VideoType } from '$lib/data/channel';
import type { Video } from '$lib/content/types';

export type { Video };

export interface Feed {
	channelUrl: string;
	videos: Video[]; // long-form, newest first
	shorts: Video[]; // newest first
}

const FEED = 'https://www.youtube.com/feeds/videos.xml';
const TIMEOUT_MS = 8000;

async function get(url: string): Promise<string | null> {
	try {
		const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
		return res.ok ? await res.text() : null;
	} catch {
		return null;
	}
}

async function resolveChannelId(): Promise<string | null> {
	if (channel.id) return channel.id;
	const html = await get(`https://www.youtube.com/${channel.handle}`);
	return html?.match(/"(?:channelId|externalId)":"(UC[\w-]{22})"/)?.[1] ?? null;
}

const decode = (s: string) =>
	s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");

/** Parse YouTube's Atom feed. The format is fixed, so a small parser is enough. */
function parse(xml: string | null): Omit<Video, 'types'>[] {
	if (!xml) return [];
	return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
		const id = entry.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
		const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
		const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
		if (!id || !title || !published) return [];
		return [
			{
				id,
				title: decode(title.trim()),
				published,
				url: `https://www.youtube.com/watch?v=${id}`,
				thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
			}
		];
	});
}

async function load(): Promise<Feed> {
	const channelUrl = `https://www.youtube.com/${channel.handle}`;
	const id = await resolveChannelId();
	if (!id) return { channelUrl, videos: [], shorts: [] };

	// YouTube's auto playlists: UULF = long-form uploads, UUSH = Shorts
	const tail = id.slice(2);
	const typed = channel.types.filter((t) => t.playlistId);
	const [longXml, shortsXml, allXml, ...typeXml] = await Promise.all([
		get(`${FEED}?playlist_id=UULF${tail}`),
		get(`${FEED}?playlist_id=UUSH${tail}`),
		get(`${FEED}?channel_id=${id}`),
		...typed.map((t) => get(`${FEED}?playlist_id=${t.playlistId}`))
	]);

	const typesById = new Map<string, VideoType[]>();
	typed.forEach((t, i) => {
		for (const v of parse(typeXml[i])) typesById.set(v.id, [...(typesById.get(v.id) ?? []), t.key]);
	});
	const withTypes = (v: Omit<Video, 'types'>): Video => ({ ...v, types: typesById.get(v.id) ?? [] });

	const shorts = parse(shortsXml).map(withTypes);
	const shortIds = new Set(shorts.map((s) => s.id));
	// If the long-form playlist isn't available, fall back to the channel feed minus known Shorts
	const long = parse(longXml);
	const videos = (long.length ? long : parse(allXml).filter((v) => !shortIds.has(v.id))).map(withTypes);

	const newest = (a: Video, b: Video) => b.published.localeCompare(a.published);
	return { channelUrl, videos: videos.sort(newest), shorts: shorts.sort(newest) };
}

// One fetch per build, shared by every page that needs it
let cached: Promise<Feed> | undefined;
export const getFeed = () => (cached ??= load());
