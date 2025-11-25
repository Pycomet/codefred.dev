<script lang="ts">
	import { onMount } from 'svelte';
	import { mobileMenuOpen, navLinks, toggleMobileMenu, closeMobileMenu } from '$stores/navigation';
	import type { NavLink } from '$stores/navigation';
	import { personalData } from '$data/personal';

	let scrolled = $state(false);

	onMount(() => {
		if (typeof window === 'undefined') return;

		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function smoothScroll(selector: string) {
		if (typeof window === 'undefined') return false;
		const target = document.querySelector(selector);
		if (!target) return false;
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		return true;
	}

	function handleNavClick(e: MouseEvent, link: NavLink) {
		if (typeof window !== 'undefined' && link.scrollTarget && window.location.pathname === '/') {
			const didScroll = smoothScroll(link.scrollTarget);
			if (didScroll) {
				e.preventDefault();
				closeMobileMenu();
				return;
			}
		}

		if ($mobileMenuOpen) {
			closeMobileMenu();
		}
	}

	function handleAnchorClick(e: MouseEvent, selector: string) {
		const didScroll = smoothScroll(selector);
		if (didScroll) {
			e.preventDefault();
			closeMobileMenu();
		}
	}
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-bg-secondary/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}">
	<div class="container-custom">
		<div class="flex items-center justify-between h-16 lg:h-20">
			<!-- Logo/Name -->
			<a href="/" class="flex items-center space-x-2 group">
				<img
					src="/profile.png"
					alt="Codefred Logo"
					class="w-10 h-10 rounded-lg group-hover:scale-110 transition-transform"
				/>
				<div class="hidden sm:block">
					<div class="font-display font-bold text-lg text-text-primary">
						Codefred
					</div>
					<div class="text-xs text-text-secondary -mt-1">
						AI Systems Architect
					</div>
				</div>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden lg:flex items-center space-x-8">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={(e) => handleNavClick(e, link)}
						class="text-text-secondary hover:text-brand-primary transition-colors duration-200 font-medium relative group"
					>
						{link.label}
						<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
					</a>
				{/each}

				<!-- CTA Button -->
				<a
					href="#consultation"
					onclick={(e) => handleAnchorClick(e, '#consultation')}
					class="px-6 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105"
				>
					Book a Call
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMobileMenu}
				class="lg:hidden p-2 rounded-lg hover:bg-bg-accent transition-colors"
				aria-label="Toggle menu"
			>
				<svg
					class="w-6 h-6 text-text-primary transition-transform duration-300 {$mobileMenuOpen ? 'rotate-90' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					{#if $mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>
</nav>

<!-- Spacer to prevent content from hiding under fixed nav -->
<div class="h-16 lg:h-20"></div>

<style>
	/* Smooth transitions */
	nav {
		will-change: background-color, backdrop-filter;
	}
</style>
