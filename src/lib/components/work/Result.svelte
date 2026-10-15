<script lang="ts">
	import type { CaseStudyMeta } from '$lib/content/case-studies';

	// The "before -> after" line used for every headline result on the site
	let {
		result,
		size = 'md',
		stacked = false,
		accent = false
	}: {
		result: CaseStudyMeta['result'];
		size?: 'sm' | 'md' | 'lg' | 'xl';
		stacked?: boolean;
		accent?: boolean;
	} = $props();

	const scale = $derived(
		{
			sm: 'text-sm',
			md: 'text-lg',
			lg: 'text-2xl sm:text-3xl',
			xl: 'text-3xl sm:text-4xl md:text-5xl'
		}[size]
	);
</script>

<div data-result-size={size}>
	<p class="ledger {scale}">
		<span class="text-ink-subtle">{result.before}</span>
		<span aria-hidden="true" class="px-1 text-ink-subtle">→</span><span class="sr-only">to</span>
		<span class="font-medium {accent ? 'text-accent' : 'text-ink'}">{result.after}</span>
		{#if !stacked}
			<span class="ml-1 font-sans text-[0.8em] tracking-normal text-ink-muted">{result.label}</span>
		{/if}
	</p>
	{#if stacked}
		<p class="mt-2 text-sm text-ink-muted">{result.label}</p>
	{/if}
</div>
