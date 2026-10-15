<script lang="ts">
	import type { Video } from '$lib/content/types';

	// Thumbnail first; the YouTube player (and its ~1MB of script) loads only on click
	let { video, eager = false, from }: { video: Video; eager?: boolean; from: string } = $props();
	let playing = $state(false);
</script>

<div class="relative aspect-video overflow-hidden rounded bg-surface">
	{#if playing}
		<iframe
			class="absolute inset-0 h-full w-full"
			src="https://www.youtube-nocookie.com/embed/{video.id}?autoplay=1&rel=0"
			title={video.title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	{:else}
		<!-- Without JS the button can't play, so the wrapping link opens YouTube instead -->
		<a
			href={video.url}
			class="group absolute inset-0 block"
			data-track="youtube"
			data-track-from={from}
			onclick={(e) => {
				e.preventDefault();
				playing = true;
			}}
			aria-label="Play {video.title}"
		>
			<img
				src={video.thumbnail}
				alt=""
				width="480"
				height="360"
				loading={eager ? 'eager' : 'lazy'}
				decoding="async"
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
			/>
			<span
				class="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded bg-canvas/90 px-3 py-1.5 text-sm font-medium text-ink"
			>
				<svg aria-hidden="true" viewBox="0 0 16 16" class="h-3 w-3 fill-current"><path d="M4 2.5v11l9-5.5z" /></svg>
				Play
			</span>
		</a>
	{/if}
</div>
