<script lang="ts">
	import { experiences, getTotalYearsOfExperience } from '$data/experience';
	import Card from '$components/ui/Card.svelte';
	import Badge from '$components/ui/Badge.svelte';

	const totalYears = getTotalYearsOfExperience();
</script>

<section id="experience" class="py-20 lg:py-24 bg-bg-secondary/20">
	<div class="container-custom">
		<div class="text-center mb-12">
			<p class="text-brand-primary font-mono text-sm tracking-wide uppercase mb-2">Career Journey</p>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Experience
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				{totalYears}+ years building production systems across multiple companies and continents
			</p>
		</div>

		<!-- Stats Row -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
			<div class="text-center p-6 bg-bg-secondary border border-brand-primary/20 rounded-xl">
				<div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">{totalYears}+</div>
				<div class="text-sm text-text-muted">Years Experience</div>
			</div>
			<div class="text-center p-6 bg-bg-secondary border border-brand-primary/20 rounded-xl">
				<div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">50+</div>
				<div class="text-sm text-text-muted">Projects Shipped</div>
			</div>
			<div class="text-center p-6 bg-bg-secondary border border-brand-primary/20 rounded-xl">
				<div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">12+</div>
				<div class="text-sm text-text-muted">Countries</div>
			</div>
			<div class="text-center p-6 bg-bg-secondary border border-brand-primary/20 rounded-xl">
				<div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">100%</div>
				<div class="text-sm text-text-muted">Client Satisfaction</div>
			</div>
		</div>

		<!-- Timeline -->
		<div class="max-w-4xl mx-auto">
			<div class="relative">
				<!-- Timeline line -->
				<div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent"></div>

				<div class="space-y-12">
					{#each experiences as exp, index}
						<div class="relative">
							<!-- Timeline dot -->
							<div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
								<div class="w-4 h-4 bg-brand-primary rounded-full border-4 border-bg-primary"></div>
							</div>

							<!-- Content card - alternating sides on desktop -->
							<div class="md:grid md:grid-cols-2 md:gap-8 {index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:col-start-2'}">
								<Card hover class="p-6 h-full">
									<div class="flex items-start justify-between mb-4">
										<div>
											<h3 class="text-xl font-display font-bold text-text-primary mb-1">
												{exp.title}
											</h3>
											<p class="text-brand-primary font-semibold mb-1">{exp.company}</p>
											<p class="text-sm text-text-muted">{exp.duration}</p>
										</div>
										<Badge variant={exp.category === 'full-time' ? 'info' : 'success'}>
											{exp.category === 'full-time' ? 'Full-Time' : 'Freelance'}
										</Badge>
									</div>

									<p class="text-text-secondary mb-4 text-sm">
										{exp.description}
									</p>

									<div class="space-y-3 mb-4">
										<h4 class="text-sm font-semibold text-text-primary">Key Achievements:</h4>
										<ul class="space-y-2">
											{#each exp.achievements as achievement}
												<li class="flex items-start gap-2 text-sm text-text-secondary">
													<svg class="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
													</svg>
													<span>{achievement}</span>
												</li>
											{/each}
										</ul>
									</div>

									<div>
										<h4 class="text-xs text-text-muted uppercase tracking-wide mb-2">Tech Stack</h4>
										<div class="flex flex-wrap gap-2">
											{#each exp.techStack as tech}
												<span class="px-2 py-1 bg-bg-accent text-xs font-mono text-text-secondary rounded border border-brand-primary/10">
													{tech}
												</span>
											{/each}
										</div>
									</div>
								</Card>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Bottom CTA -->
		<div class="mt-16 text-center">
			<div class="inline-block p-8 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl border border-brand-primary/20">
				<h3 class="text-2xl font-display font-bold text-text-primary mb-3">
					Want to work together?
				</h3>
				<p class="text-text-secondary mb-6 max-w-lg">
					I'm currently taking on 2 new clients for December 2025. Available for consulting, fractional CTO roles, or project-based work.
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
						href="/about"
						class="px-6 py-3 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all"
					>
						Learn More About Me
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
