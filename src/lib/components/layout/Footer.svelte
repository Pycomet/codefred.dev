<script lang="ts">
	import { personalData } from '$data/personal';

	const currentYear = new Date().getFullYear();

	const footerLinks = {
		navigation: [
			{ label: 'About', href: '#about' },
			{ label: 'Experience', href: '#experience' },
			{ label: 'Projects', href: '#projects' },
			{ label: 'Services', href: '#consultation' }
		],
		services: [
			{ label: 'AI Audit ($500)', href: '#consultation' },
			{ label: 'Implementation Sprint', href: '#consultation' },
			{ label: 'Fractional CTO', href: '#consultation' },
			{ label: 'Emergency Rescue', href: '#consultation' }
		],
		connect: [
			{ label: 'GitHub', href: personalData.social.github },
			{ label: 'LinkedIn', href: personalData.social.linkedin },
			{ label: 'Twitter', href: personalData.social.twitter },
			{ label: 'YouTube', href: personalData.social.youtube || '#' },
			{ label: 'Dev.to', href: `https://dev.to/${personalData.social.devto}` }
		]
	};
</script>

<footer class="bg-bg-secondary border-t border-bg-accent mt-20">
	<div class="container-custom py-12 lg:py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
			<!-- Brand Column -->
			<div class="lg:col-span-1">
				<div class="flex items-center space-x-2 mb-4">
					<img
						src="/profile.png"
						alt="Codefred Logo"
						class="w-10 h-10 rounded-lg"
					/>
					<div>
						<div class="font-display font-bold text-lg text-text-primary">
							Codefred
						</div>
						<div class="text-xs text-text-secondary -mt-1">
							AI Systems Architect
						</div>
					</div>
				</div>
				<p class="text-sm text-text-secondary mb-4">
					Building the future from Abuja, Nigeria 🇳🇬
				</p>
				<p class="text-xs text-text-muted">
					Currently Building: <a href="https://grindproof.com" class="text-brand-primary hover:underline">GrindProof</a>
				</p>
			</div>

			<!-- Navigation -->
			<div>
				<h3 class="font-semibold text-text-primary mb-4">Navigation</h3>
				<ul class="space-y-2">
					{#each footerLinks.navigation as link}
						<li>
							<a href={link.href} class="text-sm text-text-secondary hover:text-brand-primary transition-colors">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Services -->
			<div>
				<h3 class="font-semibold text-text-primary mb-4">Services</h3>
				<ul class="space-y-2">
					{#each footerLinks.services as link}
						<li>
							<a href={link.href} class="text-sm text-text-secondary hover:text-brand-primary transition-colors">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Connect -->
			<div>
				<h3 class="font-semibold text-text-primary mb-4">Connect</h3>
				<ul class="space-y-2">
					{#each footerLinks.connect as link}
						<li>
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								class="text-sm text-text-secondary hover:text-brand-primary transition-colors"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
				<div class="mt-4">
					<a
						href="mailto:{personalData.email}"
						class="text-sm text-brand-primary hover:underline"
					>
						{personalData.email}
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-12 pt-8 border-t border-bg-accent">
			<div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
				<p class="text-sm text-text-muted text-center md:text-left">
					© {currentYear} {personalData.name}. Built with SvelteKit because React is too mainstream.
				</p>
				<p class="text-xs text-text-muted">
					I have a graveyard of unfinished projects. That's why I built GrindProof.
				</p>
			</div>
		</div>
	</div>
</footer>
