import type { ContentData } from '$lib/types';

export const contentData: ContentData = {
	heroHeadlines: [
		'I Ship AI Systems That Scale',
		'I Fix Broken AI Implementations',
		'I Turn Technical Chaos Into Clarity',
		'I Architect Systems That Don\'t Break'
	],
	problems: [
		{
			id: 1,
			problem: 'Our AI POC works but breaks in production',
			solution:
				'I architect systems that handle real-world load, edge cases, and angry users',
			caseStudyLink: '/case-studies/retail-security'
		},
		{
			id: 2,
			problem: 'We don\'t know if we actually need AI',
			solution: 'I\'ll tell you honestly - sometimes you need better data, not AI',
			caseStudyLink: '/case-studies/when-postgres-beat-ml'
		},
		{
			id: 3,
			problem: 'Our team doesn\'t understand AI implementation',
			solution:
				'I mentor teams and build knowledge transfer into every engagement',
			caseStudyLink: '/case-studies/team-enablement'
		},
		{
			id: 4,
			problem: 'We\'re burning cash on cloud AI services',
			solution:
				'I optimize for cost-efficiency without sacrificing performance',
			caseStudyLink: '/case-studies/cost-reduction'
		}
	],
	differentiators: [
		{
			id: 1,
			icon: '🌍',
			title: 'Global Perspective, Local Impact',
			description:
				'Operating from Nigeria, I understand emerging market constraints and opportunities'
		},
		{
			id: 2,
			icon: '🚢',
			title: 'I Ship, Not Just Architect',
			description: '50+ production systems. I write code, not just diagrams'
		},
		{
			id: 3,
			icon: '💡',
			title: 'Product Thinking',
			description:
				'Building my own SaaS (GrindProof) means I understand the full journey'
		},
		{
			id: 4,
			icon: '📚',
			title: 'Continuous Evolution',
			description:
				'From Mechanical Engineering to AI Architecture - I never stop learning'
		},
		{
			id: 5,
			icon: '🎯',
			title: 'Brutal Honesty',
			description:
				'I\'ll tell you if AI isn\'t the answer. Your success > My billable hours'
		}
	],
	trustIndicators: [
		'🏢 Senior SWE at InferenceCloud.ai',
		'🚀 50+ Production Systems Shipped',
		'🌍 Operating from Nigeria, Serving Global Clients',
		'📺 Technical Content Creator (YouTube/Writing)',
		'🛠️ Building GrindProof (My Own SaaS)',
		'🎓 Considering MSc Software Engineering'
	],
	metrics: {
		yearsExperience: 8,
		productionSystems: '50+',
		currentRole: 'Senior SWE @ InferenceCloud',
		availability: 'Taking 2 Clients'
	}
};

// Testimonials (to be collected from user)
export const testimonials = [
	// Placeholder - will be replaced with real testimonials
	{
		id: 1,
		quote:
			'Alfred saved us from a $2M mistake. He identified architectural issues our team missed for months',
		author: 'CTO, FinTech Startup',
		role: 'CTO',
		company: 'FinTech Startup',
		projectType: 'ai' as const,
		metric: 'Saved $2M',
		featured: true
	},
	{
		id: 2,
		quote:
			'Finally, someone who admits when AI isn\'t the solution. Refreshingly honest and technically brilliant',
		author: 'Founder, E-commerce Platform',
		role: 'Founder',
		company: 'E-commerce Platform',
		projectType: 'full-stack' as const,
		featured: true
	},
	{
		id: 3,
		quote:
			'Turned our prototype into a system handling 10K requests/second. Worth every penny',
		author: 'VP Engineering, Media Company',
		role: 'VP Engineering',
		company: 'Media Company',
		projectType: 'leadership' as const,
		featured: true
	}
];
