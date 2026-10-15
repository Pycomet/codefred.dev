<script lang="ts">
	import SEO from '$components/SEO.svelte';
	import Result from '$components/work/Result.svelte';
	import BookCall from '$components/BookCall.svelte';
	import { areas } from '$lib/content/case-studies';
	import { generateArticleSchema, generateBreadcrumbSchema } from '$lib/utils/structured-data';
	import { site } from '$lib/config/site';

	let { data } = $props();
	const meta = $derived(data.meta);
	const url = $derived(`${site.url}/work/${data.meta.slug}`);

	// Fixed spec sheet, identical shape for every case study
	const sheet = $derived([
		{ term: 'Problem', detail: meta.problem },
		{ term: 'Approach', detail: meta.approach },
		{ term: 'Outcome', detail: meta.outcome }
	]);
</script>

<SEO title="{meta.title} | {site.name}" description={meta.summary} canonical={url} ogType="article" />

<svelte:head>
	{@html `<script type="application/ld+json">${generateArticleSchema({
		headline: meta.title,
		description: meta.summary,
		url,
		author: { name: site.name, url: site.url },
		image: `${site.url}/og-image.png`
	})}<\/script>`}
	{@html `<script type="application/ld+json">${generateBreadcrumbSchema([
		{ name: 'Home', url: site.url },
		{ name: 'Work', url: `${site.url}/work` },
		{ name: meta.title, url }
	])}<\/script>`}
</svelte:head>

<article class="wrap pt-10 sm:pt-14">
	<nav aria-label="Breadcrumb" class="text-sm">
		<a href="/work" class="text-ink-muted hover:text-ink">Work</a>
		<span class="px-2 text-ink-subtle" aria-hidden="true">/</span>
		<span class="text-ink-subtle">{areas[meta.area]}</span>
	</nav>

	<header class="mt-6 max-w-3xl">
		<h1 class="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{meta.title}</h1>
		<p class="mt-4 text-sm text-ink-muted">
			{meta.client}<span class="px-2 text-ink-subtle">/</span>{meta.role}<span class="px-2 text-ink-subtle"
				>/</span
			>{meta.timeline}
		</p>
		<div class="mt-8">
			<Result result={meta.result} size="lg" />
		</div>
	</header>

	<dl class="mt-12 space-y-8 border-t border-line pt-10">
		{#each sheet as row}
			<div class="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-12">
				<dt class="text-sm font-medium text-ink">{row.term}</dt>
				<dd class="max-w-prose text-ink-muted">{row.detail}</dd>
			</div>
		{/each}
		<div class="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-12">
			<dt class="text-sm font-medium text-ink">Stack</dt>
			<dd class="font-mono text-sm text-ink-muted">{meta.stack.join(' / ')}</dd>
		</div>
	</dl>

	<div class="prose-cf mt-16 max-w-prose">
		<data.Body />
	</div>

	<div class="mt-20 max-w-3xl">
		<BookCall from="case-study-{meta.slug}" />
	</div>
</article>
