<script lang="ts">
	import { personalData } from '$data/personal';
	import Card from '$components/ui/Card.svelte';
</script>

<section id="about" class="py-20 lg:py-24 bg-bg-primary">
	<div class="container-custom">
		<div class="text-center mb-12">
			<p class="text-brand-primary font-mono text-sm tracking-wide uppercase mb-2">Who I Am</p>
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">
				About Me
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				From Mechanical Engineering to building AI systems that actually work in production
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
			<!-- Left: Image and Quick Facts -->
			<div class="space-y-6">
				<div class="relative">
					<div class="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl blur-2xl"></div>
					<div class="relative bg-bg-secondary border border-brand-primary/20 rounded-2xl p-8">
						<img
							src={personalData.profileImage}
							alt={personalData.name}
							class="w-48 h-48 rounded-full mx-auto object-cover border-4 border-brand-primary/30 mb-6"
						/>
						<h3 class="text-2xl font-display font-bold text-text-primary text-center mb-2">
							{personalData.name}
						</h3>
						<p class="text-brand-primary text-center mb-6">{personalData.designation}</p>

						<div class="space-y-3 text-sm">
							<div class="flex items-center gap-3 text-text-secondary">
								<svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<span>{personalData.location}</span>
							</div>
							<div class="flex items-center gap-3 text-text-secondary">
								<svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>{personalData.timezone}</span>
							</div>
							<div class="flex items-center gap-3 text-text-secondary">
								<svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span class="text-green-400">{personalData.availability}</span>
							</div>
						</div>
					</div>
				</div>

				<Card class="p-6">
					<h4 class="text-lg font-semibold text-text-primary mb-4">Connect with me</h4>
					<div class="flex flex-wrap gap-3">
						<a
							href={personalData.social.github}
							target="_blank"
							rel="noopener noreferrer"
							class="p-3 bg-bg-accent hover:bg-brand-primary/20 rounded-lg transition-colors"
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
							class="p-3 bg-bg-accent hover:bg-brand-primary/20 rounded-lg transition-colors"
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
							class="p-3 bg-bg-accent hover:bg-brand-primary/20 rounded-lg transition-colors"
							aria-label="Twitter"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
							</svg>
						</a>
					</div>
				</Card>
			</div>

			<!-- Right: Story -->
			<div class="space-y-6">
				<Card class="p-8">
					<h3 class="text-2xl font-display font-bold text-brand-primary mb-4">The Unconventional Path</h3>
					<div class="space-y-4 text-text-secondary">
						<p>
							I started as a <strong class="text-text-primary">Mechanical Engineering student</strong> in Nigeria. While my classmates were designing engines, I was building web scrapers and automating data collection for research projects.
						</p>
						<p>
							The engineering mindset stuck: <strong class="text-text-primary">systems thinking, failure analysis, and obsession with efficiency.</strong>
						</p>
						<p>
							Fast forward 8 years: I've shipped 50+ production systems, cut AI costs by 92% for FinTech clients, and built computer vision systems processing 50+ camera streams across Nigerian retail stores.
						</p>
					</div>
				</Card>

				<Card class="p-8">
					<h3 class="text-2xl font-display font-bold text-brand-primary mb-4">Why Nigeria Matters</h3>
					<div class="space-y-4 text-text-secondary">
						<p>
							Building software in Abuja isn't like building in San Francisco. <strong class="text-text-primary">Power cuts out mid-deployment. Internet is unreliable. Users are on 3G.</strong>
						</p>
						<p>
							This forced me to design systems that are <strong class="text-text-primary">resilient by default</strong>:
						</p>
						<ul class="space-y-2 list-disc list-inside text-sm">
							<li>Frequent power outages → UPS + graceful degradation</li>
							<li>Spotty internet → Offline-first, aggressive caching</li>
							<li>Low-bandwidth users → Optimized assets, lazy loading</li>
							<li>Cost constraints → Every dollar matters</li>
						</ul>
					</div>
				</Card>

				<Card class="p-8 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/30">
					<h3 class="text-2xl font-display font-bold text-brand-primary mb-4">The GrindProof Philosophy</h3>
					<div class="space-y-4 text-text-secondary">
						<p>
							I don't recommend technology I haven't personally deployed. <a href="/case-studies/grindproof-lab" class="text-brand-primary hover:text-brand-secondary transition-colors underline">GrindProof</a> (my AI accountability SaaS) is my architecture laboratory.
						</p>
						<p class="text-text-primary font-semibold">
							When I tell you "this will cost $50/month," it's not a guess. I'm showing you my actual bills.
						</p>
					</div>
				</Card>

				<div class="text-center pt-4">
					<a
						href="/about"
						class="inline-flex items-center gap-2 px-6 py-3 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all"
					>
						Read Full Story
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
