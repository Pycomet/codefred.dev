import { writable } from 'svelte/store';

// Mobile menu state
export const mobileMenuOpen = writable(false);

// Active section tracking (for scroll spy)
export const activeSection = writable('');

// Navigation links
export const navLinks = [
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/case-studies', label: 'Case Studies' },
	{ href: '/writing', label: 'Writing' },
	{ href: '/book', label: 'Book a Call' }
];

// Helper functions
export function toggleMobileMenu() {
	mobileMenuOpen.update((value) => !value);
}

export function closeMobileMenu() {
	mobileMenuOpen.set(false);
}

export function setActiveSection(section: string) {
	activeSection.set(section);
}
