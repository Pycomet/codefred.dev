import { getFeed } from '$lib/server/youtube';
import { shortsAsPosts, instagramAsPosts } from '$lib/server/posts';
import { channel } from '$lib/data/channel';

export const load = async () => {
	const feed = await getFeed();
	return {
		videos: feed.videos.slice(0, 12),
		shorts: shortsAsPosts(feed.shorts.slice(0, 6)),
		instagram: instagramAsPosts(),
		// Only types with a playlist configured get a filter button
		types: channel.types.filter((t) => t.playlistId).map(({ key, label }) => ({ key, label }))
	};
};
