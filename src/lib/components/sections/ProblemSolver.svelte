<script lang="ts">
	import { contentData } from '$data/content';
	import { slide } from 'svelte/transition';

	let openIndex = $state(0);

	function toggle(index: number) {
		openIndex = openIndex === index ? -1 : index;
	}
</script>

<section id="problems" class="py-20 lg:py-24 bg-bg-secondary/30">
	<div class="container-custom">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
					I Solve Expensive Problems
				</h2>
				<p class="text-lg text-text-secondary max-w-2xl mx-auto">
					Companies hire me when AI projects are stuck, costs are spiraling, or teams need honest technical guidance.
				</p>
			</div>

			<div class="space-y-4">
				{#each contentData.problems as problem, i}
					<div class="bg-bg-secondary border border-bg-accent rounded-lg overflow-hidden hover:border-brand-primary/30 transition-colors">
						<button
							onclick={() => toggle(i)}
							class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-bg-accent/50 transition-colors"
						>
							<div class="flex-1">
								<h3 class="text-lg font-semibold text-text-primary mb-1">
									{problem.problem}
								</h3>
								{#if openIndex !== i}
									<p class="text-sm text-text-muted line-clamp-1">
										{problem.solution}
									</p>
								{/if}
							</div>
							<svg
								class="w-6 h-6 text-brand-primary transition-transform duration-300 flex-shrink-0 ml-4"
								class:rotate-180={openIndex === i}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						{#if openIndex === i}
							<div transition:slide={{ duration: 300 }} class="px-6 pb-6">
								<div class="pt-4 border-t border-bg-accent">
									<p class="text-base text-text-secondary mb-4">
										<strong class="text-brand-primary">Solution:</strong> {problem.solution}
									</p>
									{#if problem.caseStudyLink}
										<a
											href={problem.caseStudyLink}
											class="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors"
										>
											View Case Study
											<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
											</svg>
										</a>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
