<!-- src/lib/components/sections/HeroRedesign.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { countup } from '$lib/actions/countup';

	let visible = $state(false);

	onMount(() => {
		// Trigger fade-in on load
		requestAnimationFrame(() => {
			visible = true;
		});
	});
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
		<div
			class="max-w-3xl mx-auto space-y-8 transition-all duration-500 ease-out"
			class:opacity-0={!visible}
			class:translate-y-4={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
		>
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
			<div class="flex justify-center gap-12 md:gap-16 pt-4">
				<div class="text-center">
					<div
						class="text-3xl md:text-4xl font-bold font-display text-brand-primary"
						use:countup={{ target: 92, suffix: '%', delay: 300 }}
					></div>
					<div class="text-xs text-text-muted mt-1">Cost Reduced</div>
				</div>
				<div class="text-center">
					<div
						class="text-3xl md:text-4xl font-bold font-display text-brand-secondary"
						use:countup={{ target: 2, prefix: '$', suffix: 'M+', delay: 400 }}
					></div>
					<div class="text-xs text-text-muted mt-1">Saved</div>
				</div>
				<div class="text-center">
					<div
						class="text-3xl md:text-4xl font-bold font-display text-brand-success"
						use:countup={{ target: 15, suffix: '+', delay: 500 }}
					></div>
					<div class="text-xs text-text-muted mt-1">Systems Built</div>
				</div>
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
