// Single source for identity, handles and links. Everything else reads from here,
// so a handle change is a one-line edit.

export const site = {
	name: 'Codefred',
	legalName: 'Alfred Emmanuel',
	url: 'https://codefred.dev',
	role: 'AI systems engineer',
	email: 'alfredemmanuelinyang@gmail.com',

	// Shown in the hero and About teaser. Update when you move.
	currentlyIn: 'Working remotely',

	booking: {
		url: 'https://cal.com/codefred/30min',
		calLink: 'codefred/30min',
		minutes: 30
	},

	social: {
		youtube: { label: 'YouTube', handle: '@CodefredHQ', url: 'https://www.youtube.com/@CodefredHQ' },
		instagram: { label: 'Instagram', handle: '@codefredhq', url: 'https://www.instagram.com/codefredhq' },
		github: { label: 'GitHub', handle: 'pycomet', url: 'https://github.com/pycomet' },
		linkedin: {
			label: 'LinkedIn',
			handle: 'alfredemmanuelinyang',
			url: 'https://www.linkedin.com/in/alfredemmanuelinyang/'
		},
		x: { label: 'X', handle: '@code_fredy', url: 'https://twitter.com/code_fredy' }
	},

	cv: '/cv/codefred-cv.pdf'
} as const;

export const nav = [
	{ label: 'Work', href: '/work' },
	{ label: 'Content', href: '/content' },
	{ label: 'About', href: '/about' }
] as const;

// Footer order: content channels first, then professional profiles
export const footerSocial = [site.social.youtube, site.social.instagram, site.social.github, site.social.linkedin];
