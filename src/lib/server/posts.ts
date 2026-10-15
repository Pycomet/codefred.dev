import type { Video, Post } from '$lib/content/types';
import { instagramPosts } from '$lib/data/instagram';

export const shortsAsPosts = (shorts: Video[]): Post[] =>
	shorts.map((s) => ({
		url: `https://www.youtube.com/shorts/${s.id}`,
		image: s.thumbnail,
		alt: s.title,
		kind: 'short'
	}));

export const instagramAsPosts = (): Post[] =>
	instagramPosts.map((p) => ({ url: p.url, image: p.image, alt: p.alt, kind: 'instagram' }));
