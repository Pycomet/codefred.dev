<script lang="ts">
	import { caseStudies } from '$data/case-studies';
	import Badge from '$components/ui/Badge.svelte';
	import SEO from '$components/SEO.svelte';

	const featured = caseStudies.filter((s) => s.featured);
	const rest = caseStudies.filter((s) => !s.featured);

	const primaryMetric = (study: (typeof caseStudies)[0]) => {
		const entries = Object.entries(study.metrics);
		return entries[0];
	};

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
		<div class="max-w-2xl mb-20">
			<p class="text-sm font-mono text-brand-primary tracking-wider uppercase mb-4">Case Studies</p>
			<h1 class="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
				Work that ships results
			</h1>
			<p class="text-lg text-text-secondary">
				From cutting AI costs by 92% to processing 50+ camera streams in real-time.
				Here's what production looks like.
			</p>
		</div>

		<!-- Featured: lead case study (full width) -->
		{#if featured.length > 0}
			{@const lead = featured[0]}
			{@const [metricKey, metricVal] = primaryMetric(lead)}
			<a
				href={`/case-studies/${lead.slug}`}
				class="group block mb-16 rounded-xl border border-bg-accent bg-bg-secondary overflow-hidden hover:border-brand-primary/40 transition-all duration-300"
			>
				<div class="grid md:grid-cols-2">
					<div
						class="h-64 md:h-auto bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center"
					>
						{#if lead.image}
							<img
								src={lead.image}
								alt={lead.title}
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
							/>
						{:else}
							<div class="text-center px-8">
								<span class="text-5xl md:text-6xl font-display font-bold text-brand-primary">{metricVal}</span>
								<p class="text-sm text-text-muted mt-2">{formatMetricLabel(metricKey)}</p>
							</div>
						{/if}
					</div>
					<div class="p-8 md:p-10 flex flex-col justify-center gap-4">
						<div class="flex gap-2">
							<Badge variant="info">{lead.category}</Badge>
							<Badge variant="default">{lead.timeline}</Badge>
						</div>
						<h2 class="text-2xl md:text-3xl font-display font-bold text-text-primary group-hover:text-brand-primary transition-colors">
							{lead.title}
						</h2>
						<p class="text-text-secondary leading-relaxed">{lead.tagline}</p>
						<div class="flex flex-wrap gap-6 mt-2">
							{#each Object.entries(lead.metrics).slice(0, 3) as [label, value]}
								<div>
									<span class="text-lg font-bold text-text-primary">{value}</span>
									<span class="text-xs text-text-muted ml-1">{formatMetricLabel(label)}</span>
								</div>
							{/each}
						</div>
						<span class="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary mt-2 group-hover:gap-2 transition-all">
							Read case study
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H5" />
							</svg>
						</span>
					</div>
				</div>
			</a>
		{/if}

		<!-- Remaining case studies grid -->
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each [...featured.slice(1), ...rest] as study}
				{@const [metricKey, metricVal] = primaryMetric(study)}
				<a
					href={`/case-studies/${study.slug}`}
					class="group flex flex-col rounded-xl border border-bg-accent bg-bg-secondary overflow-hidden hover:border-brand-primary/40 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-300"
				>
					<!-- Metric highlight strip -->
					<div class="px-6 pt-6 pb-4 border-b border-bg-accent/50 bg-gradient-to-r from-brand-primary/5 to-transparent">
						<span class="text-2xl font-display font-bold text-brand-primary">{metricVal}</span>
						<span class="text-xs text-text-muted ml-1.5">{formatMetricLabel(metricKey)}</span>
					</div>

					<div class="p-6 flex flex-col flex-1 gap-3">
						<div class="flex gap-2">
							<Badge variant="info">{study.category}</Badge>
							{#if study.featured}
								<Badge variant="success">Featured</Badge>
							{/if}
						</div>

						<h2 class="text-lg font-display font-bold text-text-primary group-hover:text-brand-primary transition-colors leading-snug">
							{study.title}
						</h2>

						<p class="text-sm text-text-secondary leading-relaxed line-clamp-2">
							{study.tagline}
						</p>

						<div class="mt-auto pt-4 flex items-center justify-between">
							<div class="flex flex-wrap gap-1.5">
								{#each study.techStack.slice(0, 3) as tech}
									<span class="px-2 py-0.5 bg-bg-accent text-[11px] font-mono text-text-muted rounded">
										{tech}
									</span>
								{/each}
								{#if study.techStack.length > 3}
									<span class="px-2 py-0.5 text-[11px] text-text-muted">
										+{study.techStack.length - 3}
									</span>
								{/if}
							</div>
							<svg class="w-4 h-4 text-text-muted group-hover:text-brand-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</div>
				</a>
			{/each}
		</div>

		<!-- Bottom CTA -->
		<div class="mt-20 py-12 px-8 rounded-xl border border-bg-accent bg-bg-secondary text-center max-w-2xl mx-auto">
			<h3 class="text-2xl font-display font-bold text-text-primary mb-3">
				Want results like these?
			</h3>
			<p class="text-text-secondary mb-8 text-sm">
				Book a free 15-minute consultation to discuss your project, or get a $500 quick audit
				to identify cost savings and bottlenecks.
			</p>
			<div class="flex flex-wrap gap-3 justify-center">
				<a
					href="https://cal.com/codefred/consultation"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/30 transition-all"
				>
					Book Free Call
				</a>
				<a
					href="https://cal.com/codefred/quick-fix"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-2.5 border border-brand-primary/40 text-brand-primary text-sm font-semibold rounded-lg hover:bg-brand-primary/10 transition-all"
				>
					$500 Audit
				</a>
			</div>
		</div>
	</div>
</div>
