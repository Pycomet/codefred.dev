<script lang="ts">
	import { caseStudies } from '$data/case-studies';
	import Card from '$components/ui/Card.svelte';
	import Badge from '$components/ui/Badge.svelte';
	import SEO from '$components/SEO.svelte';

	const formatMetricLabel = (key: string) =>
		key
			.replace(/([A-Z])/g, ' $1')
			.replace(/_/g, ' ')
			.replace(/\b\w/g, (char) => char.toUpperCase())
			.trim();
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
		<div class="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
			{#each caseStudies as study}
				<Card hover class="p-0 overflow-hidden flex flex-col group">
					{#if study.image}
						<div class="relative h-56 w-full overflow-hidden">
							<img
								src={study.image}
								alt={study.title}
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							/>
						</div>
					{:else}
						<div class="h-56 bg-gradient-to-r from-brand-primary/40 to-brand-secondary/40"></div>
					{/if}

					<div class="p-6 lg:p-8 flex flex-col flex-1 gap-5">
						<div class="flex flex-wrap gap-2">
							<Badge variant="info">{study.category}</Badge>
							{#if study.featured}
								<Badge variant="success">Featured</Badge>
							{/if}
							<Badge variant="default">{study.timeline}</Badge>
						</div>

						<div>
							<h2 class="text-2xl font-display font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
								{study.title}
							</h2>
							<p class="text-text-secondary text-base">{study.tagline}</p>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-text-muted">
							<div>
								<p class="font-semibold text-text-primary uppercase text-xs tracking-wide">Client</p>
								<p>{study.client}</p>
							</div>
							<div>
								<p class="font-semibold text-text-primary uppercase text-xs tracking-wide">Role</p>
								<p>{study.role}</p>
							</div>
							<div>
								<p class="font-semibold text-text-primary uppercase text-xs tracking-wide">Timeline</p>
								<p>{study.timeline}</p>
							</div>
						</div>

						<p class="text-base text-text-secondary">
							{study.excerpt}
						</p>

						<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
							{#each Object.entries(study.metrics) as [label, value]}
								<div class="text-center p-4 bg-bg-accent rounded-lg">
									<div class="text-xl font-bold text-brand-primary">
										{value}
									</div>
									<div class="text-xs text-text-muted">
										{formatMetricLabel(label)}
									</div>
								</div>
							{/each}
						</div>

						<div>
							<p class="text-xs text-text-muted uppercase tracking-wide mb-2">Stack</p>
							<div class="flex flex-wrap gap-2">
								{#each study.techStack as tech}
									<span class="px-3 py-1 bg-bg-accent text-xs font-mono text-text-secondary rounded-full border border-brand-primary/10">
										{tech}
									</span>
								{/each}
							</div>
						</div>

						<div class="pt-2">
							<a
								href={`/case-studies/${study.slug}`}
								class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
							>
								Read Full Case Study
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H5" />
								</svg>
							</a>
						</div>
					</div>
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
