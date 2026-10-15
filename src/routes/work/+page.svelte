<script lang="ts">
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import SEO from '$components/SEO.svelte';
	import Result from '$components/work/Result.svelte';
	import BookCall from '$components/BookCall.svelte';
	import type { Area } from '$lib/content/case-studies';
	import { builds } from '$lib/data/builds';

	let { data } = $props();

	// Filtering happens in the browser: the prerendered HTML lists every study,
	// so the page still works without JS. ?area= deep links come from the home page.
	let area: Area | 'all' = $state('all');
	let ready = $state(false);

	const usedAreas = $derived(
		(Object.keys(data.areas) as Area[]).filter((a) => data.studies.some((s) => s.area === a))
	);
	const visible = $derived(area === 'all' ? data.studies : data.studies.filter((s) => s.area === area));

	onMount(() => {
		const q = new URLSearchParams(location.search).get('area');
		// Unknown or empty areas fall back to "All" instead of an empty list
		if (q && usedAreas.includes(q as Area)) area = q as Area;
		ready = true;
	});

	function choose(next: Area | 'all') {
		area = next;
		const url = new URL(location.href);
		if (next === 'all') url.searchParams.delete('area');
		else url.searchParams.set('area', next);
		replaceState(url, {});
	}
</script>

<SEO
	title="Work: AI cost, agents and computer vision case studies | Codefred"
	description="Case studies with real numbers: cutting OpenAI spend 92%, halving LLM agent conversations, real-time computer vision on 50+ camera streams."
	canonical="https://codefred.dev/work"
/>

<div class="wrap pt-14 sm:pt-20">
	<h1 class="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Work</h1>
	<p class="mt-3 max-w-prose text-ink-muted">
		Production AI systems, each with the numbers that changed. Open one to see how.
	</p>

	{#if ready && usedAreas.length > 1}
		<div role="group" aria-label="Filter by area" class="mt-8 flex flex-wrap gap-2">
			{#each ['all', ...usedAreas] as a}
				<button
					type="button"
					aria-pressed={area === a}
					onclick={() => choose(a as Area | 'all')}
					class="rounded border px-3 py-1.5 text-sm transition-colors {area === a
						? 'border-ink bg-ink text-canvas'
						: 'border-line text-ink-muted hover:border-ink-subtle hover:text-ink'}"
				>
					{a === 'all' ? 'All' : data.areas[a as Area]}
				</button>
			{/each}
		</div>
	{/if}

	<ol class="mt-10 divide-y divide-line border-y border-line">
		{#each visible as study (study.slug)}
			<li data-area={study.area}>
				<a
					href="/work/{study.slug}"
					class="group grid gap-3 py-8 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-10"
				>
					<div>
						<h2 data-heading="item" class="text-lg font-medium leading-snug tracking-tight group-hover:text-accent sm:text-xl">
							{study.title}
						</h2>
						<p class="mt-2 text-sm text-ink-muted">{study.client}</p>
						<p class="mt-4 font-mono text-xs text-ink-subtle">{study.stack.join(' / ')}</p>
					</div>
					<div class="md:pt-1 md:text-right">
						<Result result={study.result} />
					</div>
				</a>
			</li>
		{:else}
			<li class="py-8 text-ink-muted">Nothing in this area yet.</li>
		{/each}
	</ol>

	<section class="mt-24" aria-labelledby="builds">
		<h2 id="builds" class="h-section">Things I've built</h2>
		<p class="mt-2 max-w-prose text-ink-muted">My own products and experiments, outside client work.</p>
		<ul class="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-2">
			{#each builds as b}
				<li>
					<div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
						<h3 class="font-medium">{b.name}</h3>
						<span class="text-sm text-ink-subtle">{b.kind}</span>
					</div>
					<p class="mt-2 text-ink-muted">{b.description}</p>
					<p class="mt-3 font-mono text-xs text-ink-subtle">{b.stack.join(' / ')}</p>
					{#if b.link}
						<a href={b.link.url} class="link mt-3 inline-block text-sm" target="_blank" rel="noopener"
							>{b.link.label}</a
						>
					{/if}
				</li>
			{/each}
		</ul>
	</section>

	<div class="mt-24 max-w-3xl">
		<BookCall from="work" heading="Want results like these?" />
	</div>
</div>
