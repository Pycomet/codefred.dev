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
			'Implemented semantic caching, prompt classification, and structured outputs to slash a FinTech client\'s GPT-4 bill from $60k to $4.8k per month while making responses 400ms faster.',
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
		id: 15,
		name: 'Vibe Coding Platform',
		tagline: 'AI Code Generator with Sandboxed Execution',
		description:
			'An AI-powered coding platform that generates and executes code in real-time isolated sandboxes. Uses Trigger.dev for orchestrating complex async workflows and e2b for secure execution environments, with streaming results back to the browser. Demonstrates modern patterns for AI-assisted development tooling.',
		category: 'ai',
		featured: true,
		tools: ['Next.js', 'TypeScript', 'Trigger.dev', 'e2b', 'Vercel AI SDK'],
		role: 'Creator',
		status: '🚀 Live',
		metrics: {
			execution: 'Isolated sandboxes',
			streaming: 'Real-time results',
			orchestration: 'Trigger.dev workflows'
		},
		links: {
			github: 'https://github.com/Pycomet/vibe-coding-e2b-trigger',
			demo: 'https://vibe-coding-e2b-trigger.vercel.app'
		}
	},
	{
		id: 16,
		name: 'O-Agent Core',
		tagline: 'Production LLM Agent Execution Framework',
		description:
			'A multi-runtime agent framework that accepts natural language goals, decides whether to answer directly or invoke tools, and returns structured results with full execution traces. Features a schema-driven tool registry, safe sandboxed execution, and hybrid Python + Node.js architecture with Trigger.dev orchestration.',
		category: 'ai',
		featured: true,
		tools: ['Python', 'FastAPI', 'TypeScript', 'Trigger.dev', 'Vercel AI SDK', 'OpenAI', 'Docker'],
		role: 'Architect',
		status: '✅ Delivered',
		metrics: {
			architecture: 'Multi-runtime (Python + Node.js)',
			toolExecution: 'Schema-driven registry',
			tracing: 'Full execution traces'
		},
		links: {
			github: 'https://github.com/Pycomet/o-agent-core'
		}
	},
	{
		id: 17,
		name: 'Tracepaper',
		tagline: 'Offline-First AI Research Assistant',
		description:
			'A desktop research companion that monitors your activity—papers, podcasts, videos, code—and turns it into searchable, structured knowledge. Features semantic search over personal research, automatic transcription with Whisper, daily summaries, and a Chrome extension for content capture. Built as an Electron app with a FastAPI ML backend.',
		category: 'ai',
		featured: true,
		tools: ['Electron', 'React', 'FastAPI', 'Whisper', 'Sentence Transformers', 'FAISS', 'SQLite', 'Docker'],
		role: 'Creator',
		status: '🚀 Active',
		metrics: {
			search: 'Semantic vector search',
			transcription: 'Whisper-powered',
			platform: 'Desktop + Chrome extension'
		},
		links: {
			github: 'https://github.com/Pycomet/tracepaper'
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
		id: 18,
		name: 'Cafe Fausse',
		tagline: 'Full-Stack Restaurant Management Platform',
		description:
			'A complete restaurant management system with a Flask REST API backend and React 19 frontend. Features table reservations, menu management, newsletter signups, and staff authentication. Backend includes Swagger API docs, Alembic migrations, Resend email integration, and 49 tests. Frontend is E2E tested with Playwright and includes a password-protected staff admin.',
		category: 'full-stack',
		featured: true,
		tools: ['React 19', 'TailwindCSS', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'Alembic', 'Playwright', 'Docker'],
		role: 'Full Stack Developer',
		status: '✅ Live',
		metrics: {
			tests: '49 backend + E2E',
			api: 'Swagger documented',
			deployment: 'Fly.io + Vercel'
		},
		links: {
			github: 'https://github.com/Pycomet/cafe-fausse-be',
			demo: 'https://cafe-fausse-fe.vercel.app'
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
			'Built a Telegram-native platform for secure, guided peer-to-peer cryptocurrency trading with escrow functionality. Integrates with BTCPay Server for multi-sig wallet management, features automated dispute resolution, affiliate and broker systems, and comprehensive trade state machines. Fully containerized with a professional dev workflow.',
		category: 'blockchain',
		featured: false,
		tools: ['Python', 'Telegram Bot API', 'BTCPay Server', 'MongoDB', 'Docker'],
		role: 'Lead Developer',
		status: '✅ Live',
		metrics: {
			platform: 'Telegram-native',
			payments: 'BTCPay multi-sig',
			features: 'Escrow, affiliates, broker system'
		},
		links: {
			github: 'https://github.com/Pycomet/escrow-service-bot',
			demo: 'https://trustedescrowbot.live'
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
			'Diagnosed a supposed "AI recommendation" need and instead delivered a performant materialized view + indexing strategy entirely in PostgreSQL.',
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
	}
];

// Helper functions
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectsByCategory = (category: Project['category']) =>
	projects.filter((p) => p.category === category);
export const getProjectById = (id: number) => projects.find((p) => p.id === id);
