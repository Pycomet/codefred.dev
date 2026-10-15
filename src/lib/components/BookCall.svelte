<script lang="ts">
	import { site } from '$lib/config/site';
	import EmailLink from '$components/ui/EmailLink.svelte';

	let {
		heading = 'Have a problem like this?',
		body = `A ${site.booking.minutes}-minute call to look at what you're building and whether I can help.`,
		from,
		variant = 'line'
	}: { heading?: string; body?: string; from: string; variant?: 'line' | 'panel' } = $props();
</script>

<section
	class={variant === 'panel' ? 'rounded bg-surface p-8 md:p-12' : 'border-t border-line pt-12'}
	data-cta={variant}
	aria-labelledby="book-{from}"
>
	<h2 id="book-{from}" class="h-section">{heading}</h2>
	<p class="mt-3 max-w-prose text-ink-muted">{body}</p>
	<div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
		<a href="/book" class="btn-primary" data-track="book" data-track-from={from}>Book a call</a>
		<span class="text-sm text-ink-muted">or email <EmailLink class="link" /></span>
	</div>
</section>
