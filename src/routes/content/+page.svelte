<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$components/SEO.svelte';
	import LiteYouTube from '$components/content/LiteYouTube.svelte';
	import PostStrip from '$components/content/PostStrip.svelte';
	import { site } from '$lib/config/site';

	let { data } = $props();

	let type = $state('all');
	let ready = $state(false);
	onMount(() => (ready = true));
	const visible = $derived(
		type === 'all' ? data.videos : data.videos.filter((v) => v.types.includes(type as never))
	);

	const yt = site.social.youtube;
	const ig = site.social.instagram;
	const date = (iso: string) =>
		new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
</script>

<SEO
	title="Videos on AI engineering, build logs and remote work | Codefred"
	description="Build logs, AI engineering explainers and remote-work episodes from Codefred on YouTube and Instagram."
	canonical="https://codefred.dev/content"
/>

<div class="wrap pt-14 sm:pt-20">
	<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Content</h1>
	<p class="mt-3 max-w-prose text-ink-muted">
		Build logs, AI engineering explainers, gear and setup, and episodes on working remotely.
	</p>
	<div class="mt-6 flex flex-wrap gap-3">
		<a href="{yt.url}?sub_confirmation=1" class="btn-primary" target="_blank" rel="me noopener" data-track="youtube" data-track-from="content-subscribe"
			>Subscribe on YouTube</a
		>
		<a href={ig.url} class="btn-quiet" target="_blank" rel="me noopener" data-track="instagram" data-track-from="content-follow"
			>Follow {ig.handle}</a
		>
	</div>

	<section class="mt-16" aria-labelledby="videos">
		<h2 id="videos" class="h-section">Latest videos</h2>

		{#if data.types.length}
			<div role="group" aria-label="Filter by type" class="mt-5 flex flex-wrap gap-2">
				{#each [{ key: 'all', label: 'All' }, ...data.types] as t}
					<button
						type="button"
						aria-pressed={type === t.key}
						disabled={!ready}
						onclick={() => (type = t.key)}
						class="min-h-11 rounded border px-3 text-sm transition-colors disabled:opacity-60 {type === t.key
							? 'border-ink bg-ink text-canvas'
							: 'border-line text-ink-muted hover:border-ink-subtle hover:text-ink'}">{t.label}</button
					>
				{/each}
			</div>
		{/if}
		<p role="status" class="sr-only">{visible.length} videos</p>

		{#if visible.length}
			<ul class="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
				{#each visible as video, i (video.id)}
					<li>
						<LiteYouTube {video} eager={i < 2} from="content-grid" />
						<h3 class="mt-3 font-medium leading-snug">{video.title}</h3>
						<p class="mt-1 text-sm text-ink-subtle">{date(video.published)}</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="mt-6 text-ink-muted">
				The latest videos are on <a class="link" href={yt.url} data-track="youtube" data-track-from="content-empty"
					>YouTube</a
				>.
			</p>
		{/if}
	</section>

	{#if data.shorts.length}
		<section class="mt-20" aria-labelledby="shorts">
			<h2 id="shorts" class="h-section">Shorts</h2>
			<div class="mt-6"><PostStrip posts={data.shorts} from="content-shorts" /></div>
		</section>
	{/if}

	<section class="mt-20" aria-labelledby="instagram">
		<div class="flex flex-wrap items-baseline justify-between gap-4">
			<h2 id="instagram" class="h-section">On Instagram</h2>
			<a href={ig.url} class="link text-sm" target="_blank" rel="me noopener" data-track="instagram" data-track-from="content-strip"
				>Follow {ig.handle}</a
			>
		</div>
		{#if data.instagram.length}
			<div class="mt-6"><PostStrip posts={data.instagram} from="content-instagram" /></div>
		{/if}
	</section>
</div>
