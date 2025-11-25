<script lang="ts">
	import { differentiators } from '$data/differentiators';
	import Card from '$components/ui/Card.svelte';

	const iconMap: Record<string, string> = {
		truth: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
		calculator: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
		rocket: 'M13 10V3L4 14h7v7l9-11h-7z',
		globe: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
	};
</script>

<section id="differentiators" class="py-20 lg:py-24 bg-bg-secondary/30">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Why Work With Me
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				I'm not your typical consultant. Here's what makes working with me different.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
			{#each differentiators as diff}
				<Card hover class="p-6 flex flex-col">
					<div class="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconMap[diff.icon]} />
						</svg>
					</div>

					<h3 class="text-xl font-display font-bold text-text-primary mb-3">
						{diff.title}
					</h3>

					<p class="text-base text-text-secondary">
						{diff.description}
					</p>
				</Card>
			{/each}
		</div>

		<!-- CTA -->
		<div class="mt-12 text-center">
			<a
				href="https://cal.com/codefred/consultation"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-block px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
			>
				Let's Talk About Your Project
			</a>
			<p class="mt-4 text-sm text-text-muted">
				Free 15-minute consultation • No pressure • Honest feedback
			</p>
		</div>
	</div>
</section>
