import type { CaseStudy } from '$lib/types';

export const caseStudies: CaseStudy[] = [
	{
		slug: 'cost-reduction',
		title: 'How I Cut AI Infrastructure Costs by 90%',
		tagline: 'From $60k/month to $4.8k/month (While Improving Latency)',
		client: 'Series B SaaS (FinTech)',
		role: 'Technical Consultant',
		timeline: '3 Weeks',
		category: 'ai',
		featured: true,
		excerpt:
			'A high-growth FinTech startup was burning $60,000/month on OpenAI API bills. By implementing a semantic caching layer and "Model Routing" architecture, I reduced their monthly bill to $4,800 (92% reduction) while improving average response times by 400ms.',
		metrics: {
			costReduction: '92%',
			monthlySavings: '$55,550',
			latencyImprovement: '400ms faster',
			reliability: '99.1% → 99.9%'
		},
		techStack: ['Python', 'FastAPI', 'Redis', 'OpenAI', 'HuggingFace', 'Vector Store'],
		image: '/images/case-studies/cost-reduction-og.png'
	},
	{
		slug: 'retail-security',
		title: 'AI Retail Security System',
		tagline: 'Real-time Threat Detection Across 50+ Cameras',
		client: 'Multi-Location Retail Chain',
		role: 'System Architect & AI Lead',
		timeline: '8 Weeks',
		category: 'ai',
		featured: true,
		excerpt:
			'Architected an ML pipeline processing 30fps video streams from 50+ cameras simultaneously, achieving 97% threat detection accuracy and preventing $2M in annual losses.',
		metrics: {
			scale: '50+ concurrent streams',
			accuracy: '97%',
			fps: '30 FPS per camera',
			impactAnnual: '$2M loss prevention'
		},
		techStack: ['Python', 'TensorFlow', 'OpenCV', 'RTSP', 'FastAPI', 'Redis', 'Docker'],
		image: '/images/case-studies/retail-security-og.png'
	},
	{
		slug: 'semantic-search',
		title: 'Semantic Search Implementation',
		tagline: 'Multilingual Vector Search for 1M+ Documents',
		client: 'International Knowledge Platform',
		role: 'Backend Architect',
		timeline: '6 Weeks',
		category: 'ai',
		featured: true,
		excerpt:
			'Built a production semantic search system handling Spanish and English queries across 1M+ documents with sub-100ms p99 latency using embeddings and vector databases.',
		metrics: {
			documents: '1M+',
			languages: '2 (Spanish, English)',
			latency: '<100ms p99',
			accuracy: '94% relevance'
		},
		techStack: ['Python', 'FastAPI', 'Pinecone', 'Transformers', 'PostgreSQL'],
		image: '/images/case-studies/semantic-search-og.png'
	},
	{
		slug: 'grindproof-lab',
		title: 'GrindProof: My Architecture Testing Lab',
		tagline: 'Where I Battle-Test Solutions Before Client Deployment',
		client: 'Personal SaaS Product',
		role: 'Founder & Architect',
		timeline: 'Ongoing',
		category: 'architecture',
		featured: true,
		excerpt:
			'I built GrindProof as my "architecture laboratory" where I test AI accountability mechanisms, behavioral patterns, and scalability approaches with my own resources before implementing them in client production environments.',
		metrics: {
			clientValue: 'Patterns tested here saved clients $2M+',
			purpose: 'Architecture validation',
			approach: 'Battle-test with own money first'
		},
		techStack: ['Next.js', 'TypeScript', 'tRPC', 'Supabase', 'Google Generative AI', 'GitHub API'],
		image: '/images/case-studies/grindproof-og.png'
	},
	{
		slug: 'when-postgres-beat-ml',
		title: 'When Postgres Beat Machine Learning',
		tagline: 'How a Database Optimization Solved an "AI Problem"',
		client: 'E-commerce Platform',
		role: 'Technical Consultant',
		timeline: '1 Week',
		category: 'full-stack',
		featured: false,
		excerpt:
			'Client wanted an AI recommendation engine. After analysis, I discovered their "ML problem" was actually a data quality issue. A well-designed Postgres query solved it 10x faster and cheaper.',
		metrics: {
			cost: '$0 vs $5k/month AI service',
			performance: '10x faster',
			complexity: '90% reduction',
			honesty: 'Priceless'
		},
		techStack: ['PostgreSQL', 'SQL', 'Data Modeling'],
		image: '/images/case-studies/postgres-beat-ml-og.png'
	}
];

// Helper functions
export const getFeaturedCaseStudies = () => caseStudies.filter((cs) => cs.featured);

export const getCaseStudiesByCategory = (category: CaseStudy['category']) =>
	caseStudies.filter((cs) => cs.category === category);

export const getCaseStudyBySlug = (slug: string) =>
	caseStudies.find((cs) => cs.slug === slug);
