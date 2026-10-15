<!-- src/lib/components/sections/HeroRedesign.svelte -->
<script lang="ts">
	// Each figure is taken from the linked case study
	const heroStats = [
		{ value: '92%', label: 'lower AI spend', slug: 'cost-reduction', color: 'text-brand-primary' },
		{ value: '97%', label: 'threat detection accuracy', slug: 'retail-security', color: 'text-brand-secondary' },
		{ value: '70 → 35', label: 'worst-case agent turns', slug: 'compass-kenya', color: 'text-brand-success' }
	];
</script>

<section
	id="home"
	class="relative min-h-screen flex items-center justify-center bg-bg-primary"
>
	<!-- Subtle radial gradient background -->
	<div
		class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#18181b_0%,_#09090b_70%)]"
	></div>

	<!-- Content -->
	<div class="container-custom relative z-10 text-center py-20">
		<div class="max-w-3xl mx-auto space-y-8">
			<!-- Label -->
			<p class="text-brand-primary font-mono text-sm tracking-[0.2em] uppercase">
				AI Systems Architect
			</p>

			<!-- Headline -->
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-text-primary">
				I turn expensive AI problems
				<br />
				into <span class="gradient-text">efficient systems</span>
			</h1>

			<!-- Metrics -->
			<!-- Rendered server-side: every number is in the HTML and links to its proof -->
			<div class="flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-16 pt-4">
				{#each heroStats as stat}
					<a href="/case-studies/{stat.slug}" class="text-center group">
						<div class="text-3xl md:text-4xl font-bold font-display {stat.color}">
							{stat.value}
						</div>
						<div class="text-xs text-text-muted mt-1 group-hover:text-text-secondary transition-colors">
							{stat.label}
						</div>
					</a>
				{/each}
			</div>

			<!-- CTAs -->
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
				<a
					href="#case-studies"
					class="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-300 text-center"
				>
					See my work
				</a>
				<a
					href="#contact"
					class="text-text-secondary hover:text-brand-primary transition-colors text-sm"
				>
					or get in touch
				</a>
			</div>
		</div>
	</div>
</section>
