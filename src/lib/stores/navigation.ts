import { writable } from 'svelte/store';

// Mobile menu state
export const mobileMenuOpen = writable(false);

// Active section tracking (for scroll spy)
export const activeSection = writable('');

export type NavLink = {
	href: string;
	label: string;
	scrollTarget?: string;
};

// Navigation links with optional smooth-scroll targets (home sections)
export const navLinks: NavLink[] = [
	{ href: '/case-studies', label: 'Work' },
	{ href: '/about', label: 'About' },
	{ href: '#contact', label: 'Contact', scrollTarget: '#contact' }
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
