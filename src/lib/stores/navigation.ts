import { writable } from 'svelte/store';

// Mobile menu state
export const mobileMenuOpen = writable(false);

// Active section tracking (for scroll spy)
export const activeSection = writable('');

// Navigation links
export const navLinks = [
	{ href: '#about', label: 'About' },
	{ href: '#experience', label: 'Experience' },
	{ href: '#skills', label: 'Skills' },
	{ href: '#projects', label: 'Projects' },
	{ href: '#consultation', label: 'Services' },
	{ href: '#contact', label: 'Contact' }
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
