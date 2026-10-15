// Privacy-friendly event tracking. PostHog loads after the page is idle so it
// never competes with first paint. Links opt in with data-track="<event>" and an
// optional data-track-from="<placement>"; one delegated listener sends them.

type PostHog = typeof import('posthog-js').default;
let client: PostHog | null = null;
const queue: Array<[string, Record<string, unknown>]> = [];

export function track(event: string, props: Record<string, unknown> = {}) {
	if (client) client.capture(event, props);
	else queue.push([event, props]);
}

export function initAnalytics(key: string | undefined, host: string | undefined) {
	if (!key) return;

	document.addEventListener('click', (e) => {
		const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
		if (!el) return;
		track(`click_${el.dataset.track}`, {
			from: el.dataset.trackFrom,
			href: el.getAttribute('href')
		});
	});

	const load = async () => {
		const { default: posthog } = await import('posthog-js');
		posthog.init(key, {
			api_host: host,
			person_profiles: 'identified_only',
			autocapture: false,
			// Counts client-side navigations too, not just the first load
			capture_pageview: 'history_change'
		});
		client = posthog;
		for (const [event, props] of queue.splice(0)) posthog.capture(event, props);
	};

	if ('requestIdleCallback' in window) requestIdleCallback(() => load(), { timeout: 4000 });
	else setTimeout(load, 2000);
}
