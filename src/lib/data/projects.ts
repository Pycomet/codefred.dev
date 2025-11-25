import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		id: 0,
		name: 'GrindProof',
		tagline: 'My Architecture Testing Lab',
		description:
			'Where I validate AI patterns and system designs before deploying them to your production environment. This PWA combines AI-generated accountability reports, GitHub integration, and Google Calendar sync to help developers overcome project ADD and ship consistently.',
		category: 'laboratory',
		featured: true,
		tools: ['Next.js', 'TypeScript', 'tRPC', 'Supabase', 'Google Generative AI', 'GitHub API', 'PWA'],
		role: 'Founder & Architect',
		status: '🔬 Live Laboratory',
		positioning:
			"This isn't a distraction—it's where I battle-test solutions with my own money before risking yours",
		clientValue:
			'Every pattern implemented here has been deployed to production for paying clients',
		metrics: {
			purpose: 'Architecture validation',
			benefitToClients: 'Patterns tested here saved clients $2M+',
			proof: 'I eat my own dogfood'
		},
		links: {
			github: 'https://github.com/codefred/grindproof',
			demo: 'https://grindproof.com',
			caseStudy: '/case-studies/grindproof-lab'
		},
		visual: '/images/projects/grindproof.png'
	},
	{
		id: 1,
		name: 'AI Powered Financial App',
		tagline: 'Intelligent Financial Assistant with Voice & Document Processing',
		description:
			'Built a production AI-powered financial mobile application serving thousands of users. Architected the complete backend API infrastructure with Express, TypeScript, OpenAI, and MongoDB. Implemented multi-channel authentication (OTP via AWS SES, Google, Facebook OAuth), trained custom AI assistants on proprietary financial datasets, and integrated voice-to-text transcription using AWS Transcribe. The system dynamically generates PDF term sheets from Google Sheets data and delivers them via AWS SES.',
		category: 'ai',
		featured: true,
		tools: [
			'Express',
			'TypeScript',
			'MongoDB',
			'OpenAI API',
			'AWS SES',
			'AWS S3',
			'AWS Transcribe',
			'EC2',
			'PM2',
			'Nginx'
		],
		role: 'Backend Architect & AI Integration Lead',
		status: '✅ Delivered & Running',
		metrics: {
			users: 'Thousands',
			aiFeatures: 'Voice transcription, Custom trained assistants',
			infrastructure: 'AWS multi-service architecture'
		},
		links: {
			github: '',
			demo: ''
		}
	},
	{
		id: 2,
		name: 'Travel Agency Platform',
		tagline: 'Full-Stack Multi-Language Travel Booking System',
		description:
			'Designed and developed a comprehensive full-stack web application for 2Expedition, an Armenian travel agency. Created an intuitive UI using Next.js, TypeScript, MUI, and Tailwind CSS with Google Maps integration, multi-language support, and multi-currency handling. Built a robust REST API with NestJS, TypeScript, MySQL, and TypeORM. Deployed frontend to AWS Amplify and backend to AWS EC2 with proper CI/CD pipelines.',
		category: 'full-stack',
		featured: true,
		tools: [
			'Next.js',
			'Tailwind CSS',
			'Google Maps API',
			'NestJS',
			'TypeScript',
			'MySQL',
			'TypeORM',
			'AWS S3',
			'AWS Amplify',
			'AWS EC2'
		],
		role: 'Full Stack Developer',
		status: '✅ Production 24/7',
		metrics: {
			languages: 'Multiple',
			currencies: 'Multiple',
			deployment: 'AWS multi-region'
		},
		links: {
			github: '',
			demo: ''
		}
	},
	{
		id: 3,
		name: 'Movement For Good (Act2EndFGM)',
		tagline: 'Social Impact Platform for FGM Elimination Campaign',
		description:
			'Built a web portal supporting the #Act2EndFGM campaign—a whole-of-society initiative to eliminate Female Genital Mutilation (FGM) across five Nigerian states (Ebonyi, Ekiti, Imo, Osun, Oyo). The platform manages pledges, coordinates grassroots initiatives, and tracks community-led efforts to scale up FGM elimination programs. Handles high traffic during campaign launches while maintaining data integrity for sensitive social impact metrics.',
		category: 'full-stack',
		featured: false,
		tools: ['React', 'TypeScript', 'AWS', 'MySQL', 'SCSS'],
		role: 'Full Stack Developer',
		status: '✅ Live & Active',
		metrics: {
			impact: '5 Nigerian states',
			purpose: 'Social good',
			reach: 'Grassroots to government'
		},
		links: {
			github: '',
			demo: 'https://act2endfgm.com/home'
		}
	},
	{
		id: 4,
		name: 'TrueClient SMS',
		tagline: 'Enterprise Bulk Messaging Service with Twilio Integration',
		description:
			'Architected and built a 3-tier bulk text messaging service application leveraging Twilio\'s enterprise SMS infrastructure. Developed a RESTful API backend with Django (Python) providing robust message queuing, delivery tracking, and webhook handling. Created a responsive React frontend with Material UI for campaign management, contact segmentation, and real-time analytics. Integrated Stripe for subscription billing and payment processing.',
		category: 'full-stack',
		featured: false,
		tools: ['React', 'Material UI', 'Twilio API', 'Django', 'Python', 'Stripe', 'PostgreSQL'],
		role: 'Full Stack Developer',
		status: '✅ Delivered',
		metrics: {
			architecture: '3-tier system',
			scale: 'Bulk messaging',
			payment: 'Stripe integration'
		},
		links: {
			github: '',
			demo: ''
		}
	}
];

// Helper functions
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectsByCategory = (category: Project['category']) =>
	projects.filter((p) => p.category === category);
export const getProjectById = (id: number) => projects.find((p) => p.id === id);
