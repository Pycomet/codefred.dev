<script lang="ts">
	import { consultationPackages } from '$data/consultation-packages';
	import Card from '$components/ui/Card.svelte';
	import Badge from '$components/ui/Badge.svelte';
	import SEO from '$components/SEO.svelte';
</script>

<SEO
	title="Book a Call | Codefred - AI Consulting & Technical Leadership"
	description="Book a free 15-minute consultation or $500 quick fix audit. Get honest technical guidance on AI systems, architecture, and cost optimization."
	canonical="https://codefred.dev/book"
	ogImage="/og-book.png"
/>

<div class="py-20 bg-bg-primary">
	<div class="container-custom max-w-5xl">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text mb-6">
				Let's Work Together
			</h1>
			<p class="text-xl text-text-secondary max-w-3xl mx-auto">
				Whether you need a quick audit, architecture review, or ongoing technical leadership - start with a free conversation. No pressure, just honest technical guidance.
			</p>
		</div>

		<!-- Packages -->
		<div class="grid md:grid-cols-2 gap-8 mb-16">
			{#each consultationPackages as pkg}
				<Card hover class="p-8 flex flex-col relative overflow-hidden group">
					{#if pkg.badge}
						<div class="absolute top-6 right-6">
							<Badge variant={pkg.badge === 'Most Popular' ? 'success' : 'info'}>{pkg.badge}</Badge>
						</div>
					{/if}

					<div class="mb-6">
						<h2 class="text-3xl font-display font-bold text-text-primary mb-3">
							{pkg.name}
						</h2>
						<div class="flex items-baseline gap-2 mb-4">
							<span class="text-4xl font-bold text-brand-primary">{pkg.price}</span>
							{#if pkg.duration}
								<span class="text-sm text-text-muted">/ {pkg.duration}</span>
							{/if}
						</div>
						<p class="text-base text-text-secondary">
							{pkg.description}
						</p>
					</div>

					<div class="mb-6 flex-1">
						<p class="text-xs text-text-muted uppercase tracking-wide mb-3 font-semibold">Includes:</p>
						<ul class="space-y-3">
							{#each pkg.includes as item}
								<li class="flex items-start text-sm text-text-secondary">
									<svg class="w-5 h-5 text-brand-primary mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
							class="block w-full px-6 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-center font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105"
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

		<!-- What to Expect -->
		<div class="mb-16">
			<h2 class="text-3xl font-display font-bold text-text-primary mb-8 text-center">
				What to Expect
			</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<Card class="p-6">
					<div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-text-primary mb-2">Honest Conversation</h3>
					<p class="text-text-secondary">
						I'll tell you if AI won't solve your problem. You get real technical guidance, not sales pitches.
					</p>
				</Card>

				<Card class="p-6">
					<div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-text-primary mb-2">Clear Next Steps</h3>
					<p class="text-text-secondary">
						You'll leave with actionable recommendations, whether that's working together or DIY guidance.
					</p>
				</Card>

				<Card class="p-6">
					<div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-text-primary mb-2">Fast Response</h3>
					<p class="text-text-secondary">
						I typically respond within 24 hours on weekdays. No waiting weeks for a callback.
					</p>
				</Card>
			</div>
		</div>

		<!-- FAQ -->
		<div class="mb-16">
			<h2 class="text-3xl font-display font-bold text-text-primary mb-8 text-center">
				Common Questions
			</h2>
			<div class="space-y-4 max-w-3xl mx-auto">
				<Card class="p-6">
					<h3 class="text-lg font-semibold text-text-primary mb-2">
						What if the free call isn't enough?
					</h3>
					<p class="text-text-secondary">
						The free 15-min call is for mutual fit assessment. If you need deeper analysis, the $500 Quick Fix gives you a full audit with actionable recommendations. For ongoing work, we'll discuss custom engagements.
					</p>
				</Card>

				<Card class="p-6">
					<h3 class="text-lg font-semibold text-text-primary mb-2">
						Do you work with early-stage startups?
					</h3>
					<p class="text-text-secondary">
						Yes! Many clients are pre-seed or seed stage. The $500 Quick Fix is perfect for startups needing expert guidance without long-term commitment.
					</p>
				</Card>

				<Card class="p-6">
					<h3 class="text-lg font-semibold text-text-primary mb-2">
						What timezone are you in?
					</h3>
					<p class="text-text-secondary">
						I'm in Abuja, Nigeria (WAT - UTC+1) but work with clients globally. Cal.com automatically handles timezone conversion.
					</p>
				</Card>

				<Card class="p-6">
					<h3 class="text-lg font-semibold text-text-primary mb-2">
						How do payments work on the free Cal.com plan?
					</h3>
					<p class="text-text-secondary">
						After booking, you'll receive an invoice via email. Payment is due before the scheduled call. Simple bank transfer or Stripe payment link.
					</p>
				</Card>
			</div>
		</div>

		<!-- Final CTA -->
		<div class="text-center p-8 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-lg border border-brand-primary/20">
			<h3 class="text-2xl font-display font-bold text-text-primary mb-4">
				Still Have Questions?
			</h3>
			<p class="text-text-secondary mb-6">
				Email me directly and I'll get back to you within 24 hours.
			</p>
			<a
				href="mailto:alfred@codefred.dev"
				class="inline-block px-8 py-4 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-all font-semibold"
			>
				Send Email
			</a>
		</div>
	</div>
</div>
