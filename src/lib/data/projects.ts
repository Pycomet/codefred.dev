import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		id: 0,
		name: 'GrindProof',
		tagline: 'AI Goal & Routine Assistant',
		description:
			'Where I validate AI patterns and system designs before deploying them to your production environment. This Next.js 16 PWA combines AI-generated accountability reports (including weekly "roast reports"), GitHub integration, and Google Calendar sync to help developers overcome project ADD and ship consistently. Built with React 19, tRPC, Supabase, and Google Generative AI to verify task completion through API integrations and evidence uploads.',
		category: 'laboratory',
		featured: true,
		tools: ['Next.js 16', 'React 19', 'TypeScript', 'tRPC', 'Supabase', 'Google Generative AI', 'GitHub API', 'Google Calendar', 'PWA'],
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
			github: 'https://github.com/Pycomet/grindproof',
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
			demo: '',
			caseStudy: '/case-studies/cost-reduction'
		}
	},
	{
		id: 10,
		name: 'AI Infrastructure Cost Optimization',
		tagline: 'Cut OpenAI spend by 92% while improving latency',
		description:
			'Implemented semantic caching, prompt classification, and structured outputs to slash a FinTech client’s GPT-4 bill from $60k to $4.8k per month while making responses 400ms faster.',
		category: 'ai',
		featured: true,
		tools: ['Python', 'FastAPI', 'Redis', 'OpenAI', 'HuggingFace'],
		role: 'Technical Consultant',
		status: '✅ Delivered & Running',
		metrics: {
			costReduction: '92%',
			latencyGain: '400ms faster',
			savings: '$55k/month'
		},
		links: {
			caseStudy: '/case-studies/cost-reduction'
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
		featured: true,
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
		id: 11,
		name: 'Retail Security AI System',
		tagline: 'Real-time threat detection across 50+ camera streams',
		description:
			'Architected and shipped an end-to-end computer vision platform monitoring 50+ retail locations. Achieved 97% detection accuracy with TensorFlow pipelines, RTSP ingestion, and FastAPI services.',
		category: 'ai',
		featured: true,
		tools: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI', 'Redis', 'Docker'],
		role: 'System Architect & AI Lead',
		status: '✅ Production 24/7',
		metrics: {
			streams: '50+ cameras',
			accuracy: '97%',
			impact: '$2M loss prevention'
		},
		links: {
			caseStudy: '/case-studies/retail-security'
		}
	},
	{
		id: 4,
		name: 'TrueClient SMS',
		tagline: 'Enterprise Bulk Messaging Service with Twilio Integration',
		description:
			'Architected and built a 3-tier bulk text messaging service application leveraging Twilio\'s enterprise SMS infrastructure. Developed a RESTful API backend with Django (Python) providing robust message queuing, delivery tracking, and webhook handling. Created a responsive React frontend with Material UI for campaign management, contact segmentation, and real-time analytics. Integrated Stripe for subscription billing and payment processing.',
		category: 'full-stack',
		featured: true,
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
			demo: 'https://www.trueclient.ca'
		}
	},
	{
		id: 5,
		name: 'EscrowBot',
		tagline: 'Telegram-Native Cryptocurrency Escrow Service',
		description:
			'Built a Telegram-native platform for secure, guided peer-to-peer cryptocurrency trading with escrow functionality. The bot supports multiple cryptocurrencies and provides automated escrow services directly within Telegram, eliminating the need for external platforms. Features dispute resolution, multi-currency support, and real-time transaction tracking.',
		category: 'blockchain',
		featured: true,
		tools: ['Python', 'Telegram Bot API', 'Cryptocurrency APIs', 'Database'],
		role: 'Lead Developer',
		status: '✅ Live',
		metrics: {
			stars: '34 GitHub stars',
			currencies: 'Multi-cryptocurrency support',
			platform: 'Telegram-native'
		},
		links: {
			github: 'https://github.com/Pycomet/escrow-service-bot',
			demo: ''
		}
	},
	{
		id: 12,
		name: 'Semantic Search Platform',
		tagline: 'Multilingual vector search across 1M+ documents',
		description:
			'Built a semantic search platform serving English and Spanish users with sub-100ms latency. Combined embeddings, Pinecone, and FastAPI to deliver 94% relevance at scale.',
		category: 'ai',
		featured: true,
		tools: ['Python', 'FastAPI', 'Pinecone', 'Transformers', 'PostgreSQL'],
		role: 'Backend Architect',
		status: '✅ Delivered',
		metrics: {
			documents: '1M+',
			languages: '2 languages',
			latency: '<100ms p99'
		},
		links: {
			caseStudy: '/case-studies/semantic-search'
		}
	},
	{
		id: 6,
		name: 'PixelAI',
		tagline: 'Free AI-Powered Thumbnail Creator',
		description:
			'Developed an AI-powered thumbnail creation tool that helps content creators generate professional-looking thumbnails for YouTube videos, blog posts, and social media. Uses machine learning to suggest optimal layouts, text placement, and color schemes based on content type and platform requirements.',
		category: 'ai',
		featured: false,
		tools: ['TypeScript', 'Next.js', 'AI/ML APIs', 'Canvas API'],
		role: 'Creator',
		status: '🚀 Active',
		metrics: {
			stars: '3 GitHub stars',
			purpose: 'Content creation automation',
			cost: 'Free tool'
		},
		links: {
			github: 'https://github.com/Pycomet/pixelai',
			demo: ''
		}
	},
	{
		id: 7,
		name: 'Advertisement Telegram Bot',
		tagline: 'Targeted Group Marketing Automation Tool',
		description:
			'Created a Telegram automation bot designed for targeted marketing campaigns. The bot can join multiple Telegram groups, identify relevant audiences, and send customized messages to group members. Includes rate limiting, smart targeting, and compliance features to prevent spam while maximizing reach.',
		category: 'automation',
		featured: false,
		tools: ['Python', 'Telegram Bot API', 'Async/Await', 'Database'],
		role: 'Developer',
		status: '✅ Archived',
		metrics: {
			stars: '26 GitHub stars',
			automation: 'Multi-group targeting',
			scale: 'Bulk messaging'
		},
		links: {
			github: 'https://github.com/Pycomet-zz/advertisement-telegram-bot',
			demo: ''
		}
	},
	{
		id: 8,
		name: 'Yieldvest',
		tagline: 'Curated Stock Market Intelligence Platform',
		description:
			'Built a platform providing curated information for stock market investors based on fundamental analysis. Aggregates financial data, company metrics, and market indicators to help investors make informed decisions. Features real-time data updates, custom watchlists, and automated investment alerts.',
		category: 'fintech',
		featured: false,
		tools: ['React', 'TypeScript', 'Financial APIs', 'Data Analytics'],
		role: 'Full Stack Developer',
		status: '✅ Delivered',
		metrics: {
			focus: 'Fundamental analysis',
			data: 'Real-time stock data',
			timeline: 'Oct-Dec 2022'
		},
		links: {
			github: '',
			demo: 'https://yieldvest.hng.tech/'
		}
	},
	{
		id: 13,
		name: 'Team Enablement Accelerator',
		tagline: 'Fractional AI leadership that doubled shipping velocity',
		description:
			'Embedded with a seed-stage team to coach five engineers, install evaluation harnesses, and launch three AI workflows in five weeks.',
		category: 'ai',
		featured: true,
		tools: ['Next.js', 'FastAPI', 'LangChain', 'OpenAI', 'Supabase'],
		role: 'Fractional Head of AI',
		status: '✅ Delivered',
		metrics: {
			teamSize: '5 engineers',
			velocity: '2x faster releases',
			features: '3 AI launches'
		},
		links: {
			caseStudy: '/case-studies/team-enablement'
		}
	},
	{
		id: 14,
		name: 'When Postgres Beat Machine Learning',
		tagline: 'Replaced an overbuilt LLM plan with smart SQL',
		description:
			'Diagnosed a supposed “AI recommendation” need and instead delivered a performant materialized view + indexing strategy entirely in PostgreSQL.',
		category: 'full-stack',
		featured: true,
		tools: ['PostgreSQL', 'SQL', 'Data Modeling'],
		role: 'Technical Consultant',
		status: '✅ Delivered',
		metrics: {
			cost: '$0 infra',
			performance: '10x faster',
			complexityDrop: '90% less code'
		},
		links: {
			caseStudy: '/case-studies/when-postgres-beat-ml'
		}
	},
	{
		id: 9,
		name: 'MintWave',
		tagline: 'Multi-Blockchain NFT Asset Tracker',
		description:
			'Developed an NFT multi-blockchain real-time asset tracker for the Gitcoin Hackathon. Uses the Covalent API to track NFT assets across multiple blockchain networks, providing unified portfolio views, price tracking, and transaction history. Supports Ethereum, Polygon, BSC, and other major chains.',
		category: 'blockchain',
		featured: false,
		tools: ['React', 'TypeScript', 'Covalent API', 'Web3', 'Multi-chain'],
		role: 'Hackathon Developer',
		status: '🏆 Hackathon Project',
		metrics: {
			blockchains: 'Multi-chain support',
			event: 'Gitcoin Hackathon',
			tracking: 'Real-time NFT data'
		},
		links: {
			github: '',
			demo: 'https://mint-wave.vercel.app/'
		}
	}
];

// Helper functions
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectsByCategory = (category: Project['category']) =>
	projects.filter((p) => p.category === category);
export const getProjectById = (id: number) => projects.find((p) => p.id === id);
