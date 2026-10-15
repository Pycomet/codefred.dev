// Hand-picked Instagram posts (no Meta API, nothing to renew). About 2 minutes a month:
// 1. Save the post image as a square JPG in static/social/ (e.g. static/social/2026-10-desk.jpg)
// 2. Add an entry below, newest first. 3-6 entries is plenty.
//
// Empty list = the strip shows just the Follow button.

export interface InstagramPost {
	url: string; // https://www.instagram.com/p/<id>/
	image: string; // /social/<file>.jpg, square
	alt: string; // what's in the picture
}

export const instagramPosts: InstagramPost[] = [];
