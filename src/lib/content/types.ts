import type { VideoType } from '$lib/data/channel';

export interface Video {
	id: string;
	title: string;
	published: string; // ISO
	url: string;
	thumbnail: string;
	types: VideoType[];
}

export interface Post {
	url: string;
	image: string;
	alt: string;
	kind: 'short' | 'instagram';
}
