// YouTube settings. The site reads the channel's public RSS feeds at build time
// (on every deploy and the daily rebuild), so new uploads appear on their own.

export const channel = {
	handle: '@CodefredHQ',

	// Optional. Leave empty and the build resolves it from the handle.
	// To find it: YouTube Studio > Settings > Channel > Advanced settings ("UC...").
	id: '',

	// One playlist per video type drives the filter on /content.
	// Paste each playlist's ID (the part after list= in its URL). Empty = type hidden.
	types: [
		{ key: 'build-log', label: 'Build logs', playlistId: '' },
		{ key: 'explainer', label: 'Tech explainers', playlistId: '' },
		{ key: 'gear', label: 'Gear and setup', playlistId: '' },
		{ key: 'remote', label: 'Remote work', playlistId: '' }
	]
} as const;

export type VideoType = (typeof channel.types)[number]['key'];
