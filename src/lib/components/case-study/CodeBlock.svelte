<script lang="ts">
	interface Props {
		code: string;
		language?: string;
		title?: string;
	}

	let { code, language = 'typescript', title }: Props = $props();
</script>

<div class="my-8 rounded-xl overflow-hidden border border-bg-accent bg-bg-secondary">
	{#if title}
		<div class="px-6 py-3 bg-bg-accent border-b border-bg-accent flex items-center justify-between">
			<span class="text-sm font-semibold text-text-primary">{title}</span>
			<span class="text-xs font-mono text-text-muted uppercase">{language}</span>
		</div>
	{/if}
	
	<div class="p-6 overflow-x-auto">
		<pre class="text-sm font-mono text-text-secondary leading-relaxed"><code>{code}</code></pre>
	</div>
</div>

<style>
	pre {
		margin: 0;
		white-space: pre;
		word-wrap: normal;
	}

	code {
		display: block;
		color: var(--text-secondary);
	}
</style>

