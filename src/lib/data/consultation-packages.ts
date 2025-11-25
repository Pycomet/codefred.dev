import type { ConsultationPackage } from '$lib/types';

export const consultationPackages: ConsultationPackage[] = [
	{
		id: 'free-consultation',
		name: 'Free Consultation',
		price: 'Free',
		duration: '15 minutes',
		badge: 'Start Here',
		description: 'Let\'s discuss your project and see if we\'re a good fit. No pressure, just honest conversation.',
		includes: [
			'Project discussion',
			'Technical challenges review',
			'Feasibility assessment',
			'Custom quote if needed'
		],
		cta: 'Book Free Call',
		calLink: 'https://cal.com/codefred/15min', // Update with actual Cal.com link
		availability: 'Available this week'
	},
	{
		id: 'quick-fix',
		name: 'Quick Fix / Project Audit',
		price: '$200',
		duration: 'One-time engagement',
		badge: 'Most Popular',
		description: 'Perfect for specific problems or audits. Get expert eyes on your code, architecture, or AI implementation.',
		includes: [
			'AI implementation audit',
			'Code review (specific feature)',
			'Architecture consultation',
			'Quick bug fix or optimization',
			'Actionable recommendations',
			'Follow-up documentation'
		],
		cta: 'Book Quick Fix',
		calLink: 'https://cal.com/codefred/30min', // Update with actual Cal.com link
		availability: '2 slots this week'
	}
];

// Helper functions
export const getPackageById = (id: string) => consultationPackages.find((pkg) => pkg.id === id);

export const getFeaturedPackage = () =>
	consultationPackages.find((pkg) => pkg.badge === 'Most Popular');
