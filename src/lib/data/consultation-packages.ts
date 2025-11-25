import type { ConsultationPackage } from '$lib/types';

export const consultationPackages: ConsultationPackage[] = [
	{
		id: 'ai-audit',
		name: 'AI Audit',
		price: '$500',
		duration: '2-hour deep dive',
		badge: 'Most Popular',
		description: 'Perfect for teams wondering why their AI isn\'t working. Payment via invoice after booking.',
		includes: [
			'Complete architecture review',
			'Cost optimization analysis',
			'Scaling bottleneck identification',
			'Actionable improvement roadmap',
			'Follow-up documentation'
		],
		cta: 'Book Audit Call',
		calLink: 'codefred/ai-audit', // Update with actual Cal.com link
		availability: '2 slots this week'
	},
	{
		id: 'implementation-sprint',
		name: 'Implementation Sprint',
		price: '$2,500',
		duration: '1 week intensive',
		badge: undefined,
		description: 'When you need hands-on help RIGHT NOW',
		includes: [
			'Daily standups',
			'Hands-on coding',
			'Architecture decisions',
			'Code reviews',
			'Knowledge transfer'
		],
		cta: 'Start Sprint',
		calLink: 'codefred/sprint',
		availability: 'Next opening: Dec 15'
	},
	{
		id: 'fractional-cto',
		name: 'Fractional CTO',
		price: '$5,000+',
		duration: 'Monthly retainer',
		badge: 'Enterprise',
		description: 'Ongoing technical leadership for growing teams',
		includes: [
			'Weekly strategy calls',
			'Architecture oversight',
			'Team mentorship',
			'Vendor evaluation',
			'Board/investor prep'
		],
		cta: 'Schedule Discussion',
		calLink: 'codefred/fractional',
		availability: '1 spot available'
	},
	{
		id: 'emergency-rescue',
		name: 'Emergency Rescue',
		price: '$400/hour',
		duration: 'As needed',
		badge: '🔥 On Fire?',
		description: 'When production is down and you need help NOW',
		includes: [
			'Immediate availability',
			'Direct debugging',
			'War room support',
			'Post-mortem analysis'
		],
		cta: 'Get Help Now',
		calLink: 'codefred/emergency',
		availability: '24hr response'
	}
];

// Helper functions
export const getPackageById = (id: string) => consultationPackages.find((pkg) => pkg.id === id);

export const getFeaturedPackage = () =>
	consultationPackages.find((pkg) => pkg.badge === 'Most Popular');
