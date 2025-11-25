<script lang="ts">
	import { expertiseCategories } from '$data/expertise';

	let selectedCategory = $state<string | null>(null);
</script>

<section id="skills" class="py-20 lg:py-24 bg-bg-secondary/30">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Technical Expertise
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				8 years building production systems across AI, Full-Stack, and Infrastructure
			</p>
		</div>

		<div class="space-y-12">
			{#each expertiseCategories as category}
				<div class="bg-bg-secondary rounded-lg p-6 lg:p-8 border border-bg-accent hover:border-brand-primary/30 transition-colors">
					<h3 class="text-2xl font-display font-bold text-brand-primary mb-6">
						{category.name}
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each category.skills as skill}
							<div class="bg-bg-primary/50 rounded-lg p-4 hover:bg-bg-accent transition-colors cursor-default group">
								<div class="flex items-center justify-between mb-2">
									<span class="font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
										{skill.name}
									</span>
									<span class="text-sm text-brand-primary font-mono">
										{skill.level}%
									</span>
								</div>
								<div class="w-full bg-bg-accent rounded-full h-2 mb-3 overflow-hidden">
									<div
										class="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-1000"
										style="width: {skill.level}%"
									></div>
								</div>
								<div class="flex items-center justify-between text-xs text-text-muted">
									<span>{skill.years} years</span>
									<span>{skill.projects} projects</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
