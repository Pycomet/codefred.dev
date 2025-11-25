<script lang="ts">
	import { onMount } from 'svelte';
	import { personalData } from '$data/personal';
	import { contentData } from '$data/content';

	let currentHeadlineIndex = $state(0);
	let mouseX = $state(0);
	let mouseY = $state(0);

	// Rotate headlines every 3 seconds
	onMount(() => {
		const interval = setInterval(() => {
			currentHeadlineIndex = (currentHeadlineIndex + 1) % contentData.heroHeadlines.length;
		}, 3000);

		return () => clearInterval(interval);
	});

	// Track mouse position for gradient effect
	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

<section
	id="home"
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
>
	<!-- Gradient Mesh Background -->
	<div class="absolute inset-0 opacity-30">
		<div
			class="absolute top-0 -left-4 w-96 h-96 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
			style="transform: translate({mouseX * 0.02}px, {mouseY * 0.02}px)"
		></div>
		<div
			class="absolute top-0 -right-4 w-96 h-96 bg-brand-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
			style="animation-delay: 2s; transform: translate({mouseX * -0.02}px, {mouseY * -0.02}px)"
		></div>
		<div
			class="absolute -bottom-8 left-20 w-96 h-96 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
			style="animation-delay: 4s; transform: translate({mouseX * 0.01}px, {mouseY * 0.01}px)"
		></div>
	</div>

	<!-- Content -->
	<div class="container-custom relative z-10 py-20">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<!-- Left Column: Text Content -->
			<div class="space-y-8">
				<!-- Animated Headline -->
				<div class="space-y-4">
					<p class="text-brand-primary font-mono text-sm lg:text-base">
						Hi, I'm {personalData.name} 👋
					</p>
					<h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
						<span class="gradient-text transition-all duration-500">
							{contentData.heroHeadlines[currentHeadlineIndex]}
						</span>
					</h1>
					<p class="text-lg lg:text-xl text-text-secondary max-w-2xl">
						{personalData.bio.short}
					</p>
				</div>

				<!-- Metrics Bar -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
						<div class="text-2xl font-bold text-brand-primary">{contentData.metrics.yearsExperience}</div>
						<div class="text-xs text-text-muted">Years Experience</div>
					</div>
					<div class="bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
						<div class="text-2xl font-bold text-brand-primary">{contentData.metrics.productionSystems}</div>
						<div class="text-xs text-text-muted">Production Systems</div>
					</div>
					<div class="col-span-2 bg-bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-brand-primary/10">
						<div class="text-lg font-bold text-brand-primary">{contentData.metrics.currentRole}</div>
						<div class="text-xs text-text-muted">{contentData.metrics.availability}</div>
					</div>
				</div>

				<!-- CTAs -->
				<div class="flex flex-col sm:flex-row gap-4">
					<a
						href="#consultation"
						class="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105 text-center"
					>
						Book AI Strategy Call → $500
					</a>
					<a
						href="#case-studies"
						class="px-8 py-4 border-2 border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all duration-300 text-center"
					>
						View Case Studies
					</a>
				</div>

				<!-- Social Links -->
				<div class="flex items-center space-x-4 pt-4">
					<span class="text-sm text-text-muted">Connect:</span>
					<a
						href={personalData.social.github}
						target="_blank"
						rel="noopener noreferrer"
						class="text-text-secondary hover:text-brand-primary transition-colors"
						aria-label="GitHub"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
					</a>
					<a
						href={personalData.social.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						class="text-text-secondary hover:text-brand-primary transition-colors"
						aria-label="LinkedIn"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
					<a
						href={personalData.social.twitter}
						target="_blank"
						rel="noopener noreferrer"
						class="text-text-secondary hover:text-brand-primary transition-colors"
						aria-label="Twitter"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Right Column: Profile Image -->
			<div class="flex justify-center lg:justify-end">
				<div class="relative group">
					<div class="absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
					<div class="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105">
						<img
							src={personalData.profileImage}
							alt={personalData.name}
							class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<a href="#about" class="flex flex-col items-center text-text-muted hover:text-brand-primary transition-colors">
			<span class="text-xs mb-2">Scroll Down</span>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
			</svg>
		</a>
	</div>
</section>
