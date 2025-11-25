<script lang="ts">
	let { children } = $props();
</script>

<article class="py-20 bg-bg-primary">
	<div class="container-custom max-w-4xl">
		<!-- Back button -->
		<a
			href="/case-studies"
			class="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors mb-8"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Case Studies
		</a>

		<!-- Case study content -->
		<div class="prose prose-invert prose-lg max-w-none">
			{@render children()}
		</div>

		<!-- CTA footer -->
		<div class="mt-16 p-8 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-lg border border-brand-primary/20">
			<h3 class="text-2xl font-display font-bold text-text-primary mb-4">
				Want similar results?
			</h3>
			<p class="text-text-secondary mb-6">
				Book a free 15-minute consultation to discuss your project, or get a $500 quick audit.
			</p>
			<div class="flex flex-wrap gap-4">
				<a
					href="https://cal.com/codefred/consultation"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
				>
					Book Free Call
				</a>
				<a
					href="https://cal.com/codefred/quick-fix"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-3 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all"
				>
					Book $500 Audit
				</a>
			</div>
		</div>
	</div>
</article>

<style>
	:global(.prose) {
		color: var(--text-secondary);
	}

	:global(.prose h1) {
		color: var(--text-primary);
		font-family: var(--font-display);
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global(.prose h2) {
		color: var(--brand-primary);
		font-family: var(--font-display);
		font-size: 1.875rem;
		font-weight: 700;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}

	:global(.prose h3) {
		color: var(--text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose p) {
		margin-bottom: 1.25rem;
		line-height: 1.75;
	}

	:global(.prose strong) {
		color: var(--text-primary);
		font-weight: 600;
	}

	:global(.prose a) {
		color: var(--brand-primary);
		text-decoration: none;
		border-bottom: 1px solid var(--brand-primary);
		transition: color 0.2s;
	}

	:global(.prose a:hover) {
		color: var(--brand-secondary);
		border-bottom-color: var(--brand-secondary);
	}

	:global(.prose ul, .prose ol) {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}

	:global(.prose li) {
		margin-bottom: 0.5rem;
	}

	:global(.prose code) {
		background: var(--bg-secondary);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.875em;
		color: var(--brand-primary);
	}

	:global(.prose pre) {
		background: var(--bg-secondary);
		border: 1px solid var(--bg-accent);
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 1.25rem;
	}

	:global(.prose pre code) {
		background: transparent;
		padding: 0;
		color: var(--text-secondary);
	}

	:global(.prose blockquote) {
		border-left: 4px solid var(--brand-primary);
		padding-left: 1rem;
		margin-left: 0;
		font-style: italic;
		color: var(--text-muted);
	}

	:global(.prose img) {
		border-radius: 0.5rem;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	:global(.prose hr) {
		border-color: var(--bg-accent);
		margin-top: 2.5rem;
		margin-bottom: 2.5rem;
	}

	:global(.prose table) {
		width: 100%;
		border-collapse: collapse;
		margin: 2rem 0;
	}

	:global(.prose table th) {
		background: var(--bg-secondary);
		color: var(--brand-primary);
		font-weight: 600;
		padding: 0.75rem;
		text-align: left;
		border: 1px solid var(--bg-accent);
	}

	:global(.prose table td) {
		padding: 0.75rem;
		border: 1px solid var(--bg-accent);
	}

	/* Metrics boxes */
	:global(.prose .metrics) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 2rem 0;
	}

	:global(.prose .metric) {
		background: var(--bg-secondary);
		border: 1px solid var(--bg-accent);
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
	}

	:global(.prose .metric-value) {
		font-size: 2rem;
		font-weight: 700;
		color: var(--brand-primary);
		font-family: var(--font-display);
	}

	:global(.prose .metric-label) {
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-top: 0.25rem;
	}
</style>
