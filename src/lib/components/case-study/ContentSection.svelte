<script lang="ts">
	interface Props {
		title?: string;
		children?: any;
		variant?: 'default' | 'highlight' | 'dark';
	}

	let { title, children, variant = 'default' }: Props = $props();

	const variants = {
		default: 'bg-transparent',
		highlight: 'bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border border-brand-primary/20 rounded-xl p-8',
		dark: 'bg-bg-secondary border border-bg-accent rounded-xl p-8'
	};
</script>

<section class="my-12 {variants[variant]}">
	{#if title}
		<h2 class="text-2xl md:text-3xl font-display font-bold text-brand-primary mb-6">
			{title}
		</h2>
	{/if}
	
	<div class="prose-custom">
		{@render children?.()}
	</div>
</section>

<style>
	:global(.prose-custom) {
		color: var(--text-secondary);
		line-height: 1.75;
	}

	:global(.prose-custom p) {
		margin-bottom: 1.25rem;
	}

	:global(.prose-custom strong) {
		color: var(--text-primary);
		font-weight: 600;
	}

	:global(.prose-custom ul, .prose-custom ol) {
		margin: 1.25rem 0;
		padding-left: 1.5rem;
	}

	:global(.prose-custom li) {
		margin-bottom: 0.75rem;
		color: var(--text-secondary);
	}

	:global(.prose-custom li::marker) {
		color: var(--brand-primary);
	}

	:global(.prose-custom h3) {
		color: var(--text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 2rem 0 1rem;
	}

	:global(.prose-custom h4) {
		color: var(--text-primary);
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem;
	}

	:global(.prose-custom code) {
		background: var(--bg-secondary);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.875em;
		color: var(--brand-primary);
	}

	:global(.prose-custom a) {
		color: var(--brand-primary);
		text-decoration: none;
		border-bottom: 1px solid var(--brand-primary);
		transition: color 0.2s;
	}

	:global(.prose-custom a:hover) {
		color: var(--brand-secondary);
		border-bottom-color: var(--brand-secondary);
	}
</style>

