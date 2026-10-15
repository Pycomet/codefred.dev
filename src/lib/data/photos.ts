// Photos used on Home and About. To add one:
// 1. Export it to static/photos/ as WebP at two widths (e.g. name-600.webp, name-1200.webp)
//    Style: real places and workspaces, natural light, no heavy filters. Landscape 3:2 or
//    portrait 4:5, long edge at least 1600px before resizing. Strip location data.
// 2. Add an entry below. The About gallery shows however many exist (works with 1-6).

export interface Photo {
	src: string; // largest version
	srcset: string;
	width: number; // of `src`, so the browser reserves space (no layout shift)
	height: number;
	alt: string;
	caption?: string; // e.g. "Lisbon, March 2026"
}

export const portrait: Photo = {
	src: '/photos/portrait-512.webp',
	srcset: '/photos/portrait-320.webp 320w, /photos/portrait-512.webp 512w',
	width: 512,
	height: 512,
	alt: 'Codefred, portrait'
};

// First entry is the "from the road" photo in the home page About teaser
export const roadPhotos: Photo[] = [
	{
		src: '/photos/road-car-900.webp',
		srcset: '/photos/road-car-600.webp 600w, /photos/road-car-900.webp 900w',
		width: 900,
		height: 1268,
		alt: 'Codefred in a car on a sunny day, palm trees through the window'
	}
];
