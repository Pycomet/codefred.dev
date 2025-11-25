<script lang="ts">
	import { getFeaturedCaseStudies } from '$data/case-studies';
	import Card from '$components/ui/Card.svelte';
	import Badge from '$components/ui/Badge.svelte';

	const caseStudies = getFeaturedCaseStudies();

	const formatMetricLabel = (key: string) =>
		key
			.replace(/([A-Z])/g, ' $1')
			.replace(/_/g, ' ')
			.replace(/\b\w/g, (char) => char.toUpperCase())
			.trim();
</script>

<section id="case-studies" class="py-20 lg:py-24 bg-bg-secondary/20">
	<div class="container-custom">
		<div class="text-center mb-12">
			<p class="text-brand-primary font-mono text-sm tracking-wide uppercase mb-2">Proof of Work</p>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Case Studies
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Deep dives into real systems I architected and shipped—from slashing GPT-4 burn to coaching teams that had never deployed AI.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each caseStudies as study}
				<Card hover class="p-0 overflow-hidden flex flex-col group">
					{#if study.image}
						<div class="relative h-48 w-full overflow-hidden">
							<img
								src={study.image}
								alt={study.title}
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							/>
						</div>
					{:else}
						<div class="h-48 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40"></div>
					{/if}

					<div class="p-6 flex flex-col flex-1 gap-4">
						<div class="flex flex-wrap gap-2">
							<Badge variant="info">{study.category}</Badge>
							{#if study.featured}
								<Badge variant="success">Featured</Badge>
							{/if}
							<Badge variant="default">{study.timeline}</Badge>
						</div>

						<div>
							<h3 class="text-xl font-display font-bold text-text-primary mb-1">
								{study.title}
							</h3>
							<p class="text-sm text-text-muted">{study.tagline}</p>
						</div>

						<p class="text-sm text-text-secondary flex-1">
							{study.excerpt}
						</p>

						<div class="grid grid-cols-2 gap-3">
							{#each Object.entries(study.metrics).slice(0, 4) as [label, value]}
								<div class="p-3 bg-bg-accent rounded-lg text-center">
									<div class="text-lg font-semibold text-brand-primary">{value}</div>
									<div class="text-xs text-text-muted">{formatMetricLabel(label)}</div>
								</div>
							{/each}
						</div>

						<a
							href={`/case-studies/${study.slug}`}
							class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
						>
							Read Case Study
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
					</div>
				</Card>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 px-8 py-4 border border-brand-primary/50 text-brand-primary font-semibold rounded-lg hover:bg-brand-primary/10 transition-all"
			>
				View All Case Studies
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>

