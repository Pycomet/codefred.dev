<script lang="ts">
	import { caseStudies } from '$data/case-studies';
	import Card from '$components/ui/Card.svelte';
	import Badge from '$components/ui/Badge.svelte';
	import SEO from '$components/SEO.svelte';
</script>

<SEO
	title="Case Studies | Codefred - Real AI & Full-Stack Projects"
	description="Deep dives into production AI systems, cost optimization, and architecture decisions. See how I've helped clients save millions and build scalable systems."
	canonical="https://codefred.dev/case-studies"
	ogImage="/og-case-studies.png"
/>

<div class="py-20 bg-bg-primary">
	<div class="container-custom">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1
				class="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text mb-6"
			>
				Case Studies
			</h1>
			<p class="text-xl text-text-secondary max-w-3xl mx-auto">
				Real projects. Real results. Real lessons learned. From cutting AI costs by 92% to
				processing 50+ camera streams in real-time.
			</p>
		</div>

		<!-- Case Studies Grid -->
		<div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
			{#each caseStudies as study}
				<Card hover class="p-6 lg:p-8 flex flex-col group">
					<!-- Tags -->
					<div class="flex flex-wrap gap-2 mb-4">
						{#each study.tags.slice(0, 3) as tag}
							<Badge variant="info" size="sm">{tag}</Badge>
						{/each}
					</div>

					<!-- Title -->
					<h2
						class="text-2xl font-display font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors"
					>
						{study.title}
					</h2>

					<!-- Meta Info -->
					<div class="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
						<span>{study.client}</span>
						<span>•</span>
						<span>{study.timeline}</span>
						<span>•</span>
						<span>{study.role}</span>
					</div>

					<!-- Excerpt -->
					<p class="text-base text-text-secondary mb-6 flex-1">
						{study.excerpt}
					</p>

					<!-- Metrics -->
					<div class="grid grid-cols-3 gap-3 mb-6">
						{#each study.metrics as metric}
							<div class="text-center p-3 bg-bg-accent rounded-lg">
								<div class="text-lg font-bold text-brand-primary">
									{metric.value}
								</div>
								<div class="text-xs text-text-muted">
									{metric.label}
								</div>
							</div>
						{/each}
					</div>

					<!-- Stack -->
					<div class="mb-6">
						<p class="text-xs text-text-muted uppercase tracking-wide mb-2">Stack:</p>
						<p class="text-sm font-mono text-text-secondary">{study.stack}</p>
					</div>

					<!-- CTA -->
					<a
						href="/case-studies/{study.slug}"
						class="block w-full px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-center font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
					>
						Read Full Case Study
					</a>
				</Card>
			{/each}
		</div>

		<!-- Bottom CTA -->
		<div
			class="mt-16 p-8 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-lg border border-brand-primary/20 text-center max-w-3xl mx-auto"
		>
			<h3 class="text-2xl font-display font-bold text-text-primary mb-4">
				Want Results Like These?
			</h3>
			<p class="text-text-secondary mb-6">
				Book a free 15-minute consultation to discuss your project, or get a $500 quick audit
				to identify cost savings and bottlenecks.
			</p>
			<div class="flex flex-wrap gap-4 justify-center">
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
</div>
