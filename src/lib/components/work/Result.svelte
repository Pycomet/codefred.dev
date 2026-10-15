<script lang="ts">
	import type { CaseStudyMeta } from '$lib/content/case-studies';

	// The "before -> after" line used for every headline result on the site
	let { result, size = 'md' }: { result: CaseStudyMeta['result']; size?: 'sm' | 'md' | 'lg' } = $props();

	const scale = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl sm:text-3xl' }[size];
</script>

<p class="ledger {scale}">
	<span class="text-ink-subtle">{result.before}</span>
	<span aria-hidden="true" class="px-1 text-ink-subtle">→</span><span class="sr-only">to</span>
	<span class="font-medium text-ink">{result.after}</span>
	<span class="ml-1 font-sans text-[0.8em] tracking-normal text-ink-muted">{result.label}</span>
</p>
