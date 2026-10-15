<script lang="ts">
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import SEO from '$components/SEO.svelte';
	import Result from '$components/work/Result.svelte';
	import type { Area } from '$lib/content/case-studies';

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
		if (q && q in data.areas) area = q as Area;
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
			<li>
				<a
					href="/work/{study.slug}"
					class="group grid gap-3 py-8 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-10"
				>
					<div>
						<h2 class="text-lg font-medium leading-snug tracking-tight group-hover:text-accent sm:text-xl">
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
</div>
