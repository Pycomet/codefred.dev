<script lang="ts">
	import { consultationPackages } from '$data/consultation-packages';
	import { personalData } from '$data/personal';
	import Badge from '$components/ui/Badge.svelte';
	import Card from '$components/ui/Card.svelte';
</script>

<section id="consultation" class="py-20 lg:py-24 bg-bg-primary">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				Work With Me
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Start with a free consultation or book a quick fix for specific problems.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
			{#each consultationPackages as pkg}
				<Card hover class="p-6 flex flex-col relative overflow-hidden group">
					{#if pkg.badge}
						<div class="absolute top-4 right-4">
							<Badge variant="info">{pkg.badge}</Badge>
						</div>
					{/if}

					<div class="mb-4">
						<h3 class="text-2xl font-display font-bold text-text-primary mb-2">
							{pkg.name}
						</h3>
						<div class="flex items-baseline gap-2">
							<span class="text-3xl font-bold text-brand-primary">{pkg.price}</span>
							{#if pkg.duration}
								<span class="text-sm text-text-muted">/ {pkg.duration}</span>
							{/if}
						</div>
					</div>

					<p class="text-sm text-text-secondary mb-6">
						{pkg.description}
					</p>

					<div class="mb-6 flex-1">
						<p class="text-xs text-text-muted uppercase tracking-wide mb-3">Includes:</p>
						<ul class="space-y-2">
							{#each pkg.includes as item}
								<li class="flex items-start text-sm text-text-secondary">
									<svg class="w-5 h-5 text-brand-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
									{item}
								</li>
							{/each}
						</ul>
					</div>

					<div class="space-y-3">
						<a
							href="https://cal.com/{pkg.calLink}"
							target="_blank"
							rel="noopener noreferrer"
							class="block w-full px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-center font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105"
						>
							{pkg.cta}
						</a>
						<p class="text-xs text-center text-text-muted">
							{pkg.availability}
						</p>
					</div>

					<!-- Glow effect on hover -->
					<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
						<div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5"></div>
					</div>
				</Card>
			{/each}
		</div>

		<div class="mt-12 text-center space-y-4">
			<p class="text-sm text-text-muted">
				💡 All Cal.com bookings are free. Payment handled via invoice after consultation.
			</p>
			{#if personalData.upworkConsultation}
				<div class="max-w-2xl mx-auto p-6 bg-bg-secondary rounded-lg border border-brand-primary/20">
					<h4 class="text-lg font-semibold text-text-primary mb-2">💼 Paid Consultations via Upwork</h4>
					<p class="text-sm text-text-secondary mb-3">
						Need immediate paid advice? Book directly on Upwork for structured consultation sessions.
					</p>
					<div class="flex flex-wrap gap-3 justify-center mb-4">
						<span class="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-lg font-semibold">
							{personalData.upworkConsultation.pricing.thirtyMin} / 30 minutes
						</span>
						<span class="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-lg font-semibold">
							{personalData.upworkConsultation.pricing.oneHour} / 1 hour
						</span>
					</div>
					<div class="flex flex-wrap gap-3 justify-center">
						<a
							href={personalData.upworkConsultation.consultationUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 px-6 py-2 border-2 border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all"
						>
							Book on Upwork
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
						<a
							href={personalData.upworkConsultation.profileUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 px-6 py-2 text-text-secondary hover:text-brand-primary transition-colors"
						>
							View Profile
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</a>
					</div>
					<p class="text-xs text-text-muted mt-3">
						For custom project work, visit my Upwork profile for proposals and contracts.
					</p>
				</div>
			{/if}
		</div>
	</div>
</section>
