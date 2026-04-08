<!-- src/lib/components/sections/FeaturedCaseStudiesSticky.svelte -->
<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import { countup } from '$lib/actions/countup';
	import { caseStudies } from '$data/case-studies';

	// Pick the 3 strongest case studies for the homepage
	const featured = [
		caseStudies.find((cs) => cs.slug === 'cost-reduction')!,
		caseStudies.find((cs) => cs.slug === 'retail-security')!,
		caseStudies.find((cs) => cs.slug === 'semantic-search')!
	];

	// Hero metric config per case study
	const metricConfig: Record<string, { target: number; suffix: string; prefix: string; label: string }> = {
		'cost-reduction': { target: 92, suffix: '%', prefix: '', label: 'cost reduction' },
		'retail-security': { target: 97, suffix: '%', prefix: '', label: 'threat detection accuracy' },
		'semantic-search': { target: 100, suffix: 'ms', prefix: '<', label: 'p99 latency' }
	};

	// Case study narrative content (problem → approach → outcome)
	const narratives: Record<string, { problem: string; approach: string; outcome: string }> = {
		'cost-reduction': {
			problem:
				'A Series B FinTech startup was burning $60,000/month on OpenAI API calls. Their AI features worked but the unit economics were unsustainable — every new user made the problem worse.',
			approach:
				'I implemented a semantic caching layer that recognized when similar questions had already been answered, and built a "Model Routing" architecture that sent simple tasks to cheaper models while reserving GPT-4 for complex reasoning.',
			outcome:
				'Monthly AI spend dropped from $60,000 to $4,800. Response times actually improved by 400ms because cached responses are instant. The system is now faster, smarter about model selection, and 92% cheaper.'
		},
		'retail-security': {
			problem:
				'A multi-location retail chain needed real-time threat detection across 50+ cameras simultaneously. Existing solutions couldn\'t handle the throughput without dropping frames or missing events.',
			approach:
				'I architected an ML pipeline that processes 30fps video streams in parallel, using a tiered detection system — fast lightweight models for initial screening, accurate models for confirmation. Redis handles inter-camera event correlation.',
			outcome:
				'97% threat detection accuracy across all cameras at full frame rate. The system prevented an estimated $2M in annual losses and runs reliably 24/7 with automated alerting.'
		},
		'semantic-search': {
			problem:
				'An international knowledge platform needed search that understood meaning, not just keywords — across Spanish and English documents. Traditional search was missing relevant results constantly.',
			approach:
				'I built a vector search pipeline using multilingual embeddings, with Pinecone for similarity search and a PostgreSQL hybrid layer for metadata filtering. Query preprocessing handles language detection and expansion automatically.',
			outcome:
				'Sub-100ms p99 latency across 1M+ documents in two languages. Lawyers using the system spend 67% less time searching and find cases they would have missed with keyword search.'
		}
	};

	// Mobile expand state
	let expandedMobile: string | null = $state(null);

	function toggleMobileExpand(slug: string) {
		expandedMobile = expandedMobile === slug ? null : slug;
	}
</script>

<section id="case-studies" class="py-24 md:py-32 bg-bg-primary">
	<div class="container-custom">
		<!-- Desktop: Sticky scroll layout -->
		<div class="hidden md:block">
			{#each featured as study, i}
				{@const config = metricConfig[study.slug]}
				{@const narrative = narratives[study.slug]}
				<div
					class="flex gap-16 min-h-[80vh] {i < featured.length - 1 ? 'mb-24 pb-24 border-b border-bg-accent' : ''}"
					use:inview={{ threshold: 0.1 }}
				>
					<!-- Sticky left panel -->
					<div class="w-[40%] flex-shrink-0">
						<div class="sticky top-32 space-y-4 fade-up">
							<p class="text-brand-primary font-mono text-xs tracking-[0.15em] uppercase">
								Case Study
							</p>
							<h3 class="text-xl font-display font-semibold text-text-primary">
								{study.title}
							</h3>
							<div
								class="text-5xl lg:text-6xl font-bold font-display text-brand-success"
								use:countup={{ target: config.target, suffix: config.suffix, prefix: config.prefix, delay: 200 }}
							></div>
							<p class="text-sm text-text-muted">{config.label}</p>
							<a
								href="/case-studies/{study.slug}"
								class="inline-block text-sm text-brand-primary hover:underline mt-4"
							>
								Read full case study &rarr;
							</a>
						</div>
					</div>

					<!-- Scrolling right content -->
					<div class="w-[60%] border-l border-bg-accent pl-16 space-y-12 py-8">
						<div class="fade-up" use:inview={{ threshold: 0.3 }}>
							<p class="text-xs text-text-muted uppercase tracking-wider mb-3">The Problem</p>
							<p class="text-text-secondary leading-relaxed">{narrative.problem}</p>
						</div>
						<div class="fade-up" use:inview={{ threshold: 0.3 }}>
							<p class="text-xs text-text-muted uppercase tracking-wider mb-3">The Approach</p>
							<p class="text-text-secondary leading-relaxed">{narrative.approach}</p>
						</div>
						<div class="fade-up" use:inview={{ threshold: 0.3 }}>
							<p class="text-xs text-text-muted uppercase tracking-wider mb-3">The Outcome</p>
							<p class="text-text-secondary leading-relaxed">{narrative.outcome}</p>
						</div>
						<!-- Tech stack tags -->
						<div class="fade-up flex flex-wrap gap-2" use:inview={{ threshold: 0.3 }}>
							{#each study.techStack as tech}
								<span class="text-xs text-text-muted bg-bg-accent/50 px-3 py-1 rounded-full">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Mobile: Expandable cards -->
		<div class="md:hidden space-y-6">
			{#each featured as study}
				{@const config = metricConfig[study.slug]}
				{@const narrative = narratives[study.slug]}
				{@const isExpanded = expandedMobile === study.slug}
				<div
					class="fade-up"
					use:inview
				>
					<button
						class="w-full text-left p-6 rounded-lg border transition-colors {isExpanded ? 'border-brand-primary/30 bg-bg-secondary/30' : 'border-bg-accent bg-bg-secondary/30'}"
						onclick={() => toggleMobileExpand(study.slug)}
					>
						<div class="flex items-start justify-between gap-4">
							<div class="space-y-2">
								<p class="text-brand-primary font-mono text-xs tracking-wider uppercase">Case Study</p>
								<h3 class="text-lg font-display font-semibold text-text-primary">{study.title}</h3>
							</div>
							<div class="text-right flex-shrink-0">
								<div class="text-2xl font-bold font-display text-brand-success">
									{config.prefix}{config.target}{config.suffix}
								</div>
								<div class="text-xs text-text-muted">{config.label}</div>
							</div>
						</div>

						{#if isExpanded}
							<div class="mt-6 space-y-6 border-t border-bg-accent pt-6">
								<div>
									<p class="text-xs text-text-muted uppercase tracking-wider mb-2">The Problem</p>
									<p class="text-sm text-text-secondary leading-relaxed">{narrative.problem}</p>
								</div>
								<div>
									<p class="text-xs text-text-muted uppercase tracking-wider mb-2">The Approach</p>
									<p class="text-sm text-text-secondary leading-relaxed">{narrative.approach}</p>
								</div>
								<div>
									<p class="text-xs text-text-muted uppercase tracking-wider mb-2">The Outcome</p>
									<p class="text-sm text-text-secondary leading-relaxed">{narrative.outcome}</p>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each study.techStack as tech}
										<span class="text-xs text-text-muted bg-bg-accent/50 px-2 py-0.5 rounded-full">{tech}</span>
									{/each}
								</div>
								<a
									href="/case-studies/{study.slug}"
									class="inline-block text-sm text-brand-primary hover:underline"
								>
									Read full case study &rarr;
								</a>
							</div>
						{/if}
					</button>
				</div>
			{/each}
		</div>

		<!-- See all link -->
		<div class="text-center mt-16 fade-up" use:inview>
			<a
				href="/case-studies"
				class="text-sm text-text-secondary hover:text-brand-primary transition-colors"
			>
				See all case studies &rarr;
			</a>
		</div>
	</div>
</section>
