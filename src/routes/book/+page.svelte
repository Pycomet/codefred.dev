<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$components/SEO.svelte';
	import EmailLink from '$components/ui/EmailLink.svelte';
	import { site } from '$lib/config/site';
	import { track } from '$lib/analytics';

	// Cal.com's inline embed, loaded only on this page and only once the page is idle.
	// Until it arrives (or if it fails) the plain link below still books the call.
	let embedState: 'loading' | 'ready' | 'failed' = $state('loading');

	/* eslint-disable @typescript-eslint/no-explicit-any */
	// Cal.com's official embed bootstrap (queues calls until embed.js loads), typed loosely
	function bootstrapCal(C: any, A: string, L: string) {
		const p = (a: any, ar: any) => a.q.push(ar);
		const d = C.document;
		C.Cal =
			C.Cal ||
			function (...ar: any[]) {
				const cal = C.Cal;
				if (!cal.loaded) {
					cal.ns = {};
					cal.q = cal.q || [];
					const s = d.createElement('script');
					s.src = A;
					s.onerror = () => (embedState = 'failed');
					d.head.appendChild(s);
					cal.loaded = true;
				}
				if (ar[0] === L) {
					const api: any = (...args: any[]) => p(api, args);
					const namespace = ar[1];
					api.q = api.q || [];
					if (typeof namespace === 'string') {
						cal.ns[namespace] = cal.ns[namespace] || api;
						p(cal.ns[namespace], ar);
						p(cal, ['initNamespace', namespace]);
					} else p(cal, ar);
					return;
				}
				p(cal, ar);
			};
		return C.Cal as (...args: any[]) => void;
	}

	onMount(() => {
		const start = () => {
			const cal = bootstrapCal(window, 'https://app.cal.com/embed/embed.js', 'init');
			cal('init', { origin: 'https://cal.com' });
			cal('inline', {
				elementOrSelector: '#cal-embed',
				calLink: site.booking.calLink,
				layout: 'month_view'
			});
			cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
			cal('on', {
				action: 'bookingSuccessful',
				callback: () => track('booking_confirmed', { from: 'book-page' })
			});
			cal('on', { action: 'linkReady', callback: () => (embedState = 'ready') });
			cal('on', { action: 'linkFailed', callback: () => (embedState = 'failed') });

			// Safety net: if the event never fires, reveal the calendar once its iframe loads
			const host = document.getElementById('cal-embed')!;
			const observer = new MutationObserver(() => {
				const frame = host.querySelector('iframe');
				if (!frame) return;
				observer.disconnect();
				frame.addEventListener('load', () => {
					if (embedState === 'loading') embedState = 'ready';
				});
			});
			observer.observe(host, { childList: true, subtree: true });
		};

		if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 });
		else setTimeout(start, 500);
	});
</script>

<SEO
	title="Book a {site.booking.minutes}-minute intro call | Codefred"
	description="Pick a time for a {site.booking.minutes}-minute call about your AI system, agent or product build. Free, no preparation needed."
	canonical="https://codefred.dev/book"
/>

<div class="wrap pt-14 sm:pt-20">
	<div class="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-16">
		<div>
			<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Book a call</h1>
			<p class="mt-3 text-ink-muted">
				{site.booking.minutes} minutes on video, free. Pick any open time.
			</p>

			<h2 class="mt-10 text-sm font-medium">What happens on the call</h2>
			<ol class="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink-muted marker:text-ink-subtle">
				<li>You walk me through the problem and what you've tried.</li>
				<li>I ask about the system, the numbers and the deadline.</li>
				<li>You leave with my honest read, and a proposal if it's a fit.</li>
			</ol>

			<p class="mt-10 text-sm text-ink-muted">
				Prefer email? <EmailLink class="link" />
			</p>
		</div>

		<div class="relative min-h-[640px] overflow-hidden rounded border border-line">
			<!-- Cal.com owns this element; Svelte never renders into it -->
			<div id="cal-embed" class="w-full"></div>
			{#if embedState !== 'ready'}
				<div
					class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas p-6 text-center"
					aria-live="polite"
				>
					<p class="text-ink-muted">
						{embedState === 'failed' ? "The calendar didn't load here." : 'Loading the calendar...'}
					</p>
					<a
						href={site.booking.url}
						class="btn-primary"
						target="_blank"
						rel="noopener"
						data-track="book"
						data-track-from="book-fallback">Open the booking page</a
					>
				</div>
			{/if}
		</div>
	</div>
</div>
