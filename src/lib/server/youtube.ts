// Build-time YouTube feed reader. Prefers the YouTube Data API (YOUTUBE_API_KEY; keys don't
// expire) because YouTube blocks its public RSS feeds from cloud builders. Falls back to RSS
// without a key. Every failure returns empty lists so a YouTube hiccup never breaks a deploy,
// and the build log says when that happens.
import { env } from '$env/dynamic/private';
import { channel, type VideoType } from '$lib/data/channel';
import type { Video } from '$lib/content/types';

export type { Video };

export interface Feed {
	channelUrl: string;
	videos: Video[]; // long-form, newest first
	shorts: Video[]; // newest first
}

const FEED = 'https://www.youtube.com/feeds/videos.xml';
const API = 'https://www.googleapis.com/youtube/v3';
const TIMEOUT_MS = 8000;

type Item = Omit<Video, 'types'>;

// Failed requests, recorded by a safe label (never the URL: Data API URLs carry the key)
type Failures = string[];

async function get(url: string, label: string, failures: Failures): Promise<string | null> {
	try {
		const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
		if (res.ok) return await res.text();
		let reason = '';
		try {
			const err = (await res.json()) as { error?: { message?: string; errors?: { reason?: string }[] } };
			reason = err.error?.errors?.[0]?.reason ?? err.error?.message ?? '';
		} catch {
			// not JSON (RSS errors are HTML)
		}
		failures.push(`${label} -> ${res.status}${reason ? ` ${reason}` : ''}`);
		return null;
	} catch (e) {
		const err = e as { name?: string; cause?: { code?: string } };
		failures.push(`${label} -> ${err.name === 'TimeoutError' ? 'timeout' : (err.cause?.code ?? 'network error')}`);
		return null;
	}
}

const item = (id: string, title: string, published: string): Item => ({
	id,
	title,
	published,
	url: `https://www.youtube.com/watch?v=${id}`,
	thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
});

async function resolveChannelId(key: string | undefined, failures: Failures): Promise<string | null> {
	if (channel.id) return channel.id;
	if (key) {
		const json = await get(
			`${API}/channels?part=id&forHandle=${encodeURIComponent(channel.handle)}&key=${key}`,
			'channels forHandle',
			failures
		);
		try {
			const id = json ? (JSON.parse(json) as { items?: { id: string }[] }).items?.[0]?.id : undefined;
			if (id) return id;
		} catch {
			// fall through to the page scrape
		}
	}
	const html = await get(`https://www.youtube.com/${channel.handle}`, 'channel page', failures);
	return html?.match(/"(?:channelId|externalId)":"(UC[\w-]{22})"/)?.[1] ?? null;
}

/** Newest items of a playlist via the Data API (long-form: UULF..., Shorts: UUSH...) */
async function apiPlaylist(playlistId: string, key: string, failures: Failures): Promise<Item[]> {
	const json = await get(
		`${API}/playlistItems?part=snippet,contentDetails&maxResults=15&playlistId=${playlistId}&key=${key}`,
		`playlistItems ${playlistId}`,
		failures
	);
	if (!json) return [];
	try {
		const data = JSON.parse(json) as {
			items?: { snippet: { title: string }; contentDetails: { videoId: string; videoPublishedAt?: string } }[];
		};
		return (data.items ?? [])
			.filter((i) => i.contentDetails.videoPublishedAt) // skip private or deleted videos
			.map((i) => item(i.contentDetails.videoId, i.snippet.title, i.contentDetails.videoPublishedAt!));
	} catch {
		return [];
	}
}

const decode = (s: string) =>
	s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");

/** Parse YouTube's Atom feed. The format is fixed, so a small parser is enough. */
function parse(xml: string | null): Item[] {
	if (!xml) return [];
	return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
		const id = entry.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
		const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
		const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
		if (!id || !title || !published) return [];
		return [item(id, decode(title.trim()), published)];
	});
}

async function load(): Promise<Feed> {
	const channelUrl = `https://www.youtube.com/${channel.handle}`;
	const key = env.YOUTUBE_API_KEY || undefined;
	const source = key ? 'Data API' : 'RSS';
	const failures: Failures = [];
	const empty = (why: string): Feed => {
		const detail = failures.length ? ` Failed requests: ${failures.slice(0, 4).join('; ')}.` : '';
		console.warn(`[youtube] No videos for ${channel.handle} (source: ${source}): ${why}.${detail} Home shows the fallback text.`);
		return { channelUrl, videos: [], shorts: [] };
	};

	const id = await resolveChannelId(key, failures);
	if (!id) return empty('channel ID could not be resolved');

	const fetchList = (playlistId: string): Promise<Item[]> =>
		key
			? apiPlaylist(playlistId, key, failures)
			: get(`${FEED}?playlist_id=${playlistId}`, `rss ${playlistId}`, failures).then(parse);

	// YouTube's auto playlists: UULF = long-form uploads, UUSH = Shorts
	const tail = id.slice(2);
	const typed = channel.types.filter((t) => t.playlistId);
	const [long, shortsRaw, ...typeLists] = await Promise.all([
		fetchList(`UULF${tail}`),
		fetchList(`UUSH${tail}`),
		...typed.map((t) => fetchList(t.playlistId))
	]);

	const typesById = new Map<string, VideoType[]>();
	typed.forEach((t, i) => {
		for (const v of typeLists[i]) typesById.set(v.id, [...(typesById.get(v.id) ?? []), t.key]);
	});
	const withTypes = (v: Item): Video => ({ ...v, types: typesById.get(v.id) ?? [] });

	const newest = (a: Video, b: Video) => b.published.localeCompare(a.published);
	const videos = long.map(withTypes).sort(newest);
	const shorts = shortsRaw.map(withTypes).sort(newest);
	if (!videos.length && !shorts.length) return empty('the feeds returned nothing');
	return { channelUrl, videos, shorts };
}

// One fetch per build, shared by every page that needs it
let cached: Promise<Feed> | undefined;
export const getFeed = () => (cached ??= load());
