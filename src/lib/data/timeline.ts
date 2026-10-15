// Short career timeline for /about. Source of truth: the CV in static/cv/.
// Keep it to highlights; the full history lives in the CV.

export interface Milestone {
	years: string;
	role: string;
	org: string;
	highlight: string;
}

export const timeline: Milestone[] = [
	{
		years: '2026 - now',
		role: 'AI Engineer',
		org: 'O.xyz (ORGN)',
		highlight: 'Building an enterprise AI IDE with confidential computing and multi-agent workflows.'
	},
	{
		years: '2024 - 2026',
		role: 'Lead Engineer',
		org: 'InferenceCloud.ai',
		highlight: 'Led frontend and backend. Moved RAG to GCP Vector Search and cut LLM inference costs by 92%.'
	},
	{
		years: '2023 - 2024',
		role: 'Senior Software Engineer, Tech Lead',
		org: 'RivetAI',
		highlight: 'Built the MVP cloud infrastructure on AWS from scratch and led the engineering team.'
	},
	{
		years: '2022',
		role: 'Web Developer',
		org: 'UNICEF Nigeria',
		highlight: 'A serverless pledge platform designed for 5 million pledges across Nigerian states.'
	},
	{
		years: '2020 - 2021',
		role: 'Frontend Developer',
		org: 'NASA (SpaceML)',
		highlight: 'Award of Merit for work on the CAMS meteor surveillance research project.'
	},
	{
		years: '2019 - now',
		role: 'Independent consultant',
		org: 'Upwork and direct clients',
		highlight: 'AI systems, agents and full-stack builds for startups and nonprofits.'
	},
	{
		years: '2014 - 2019',
		role: 'BEng, Mechanical Engineering',
		org: 'Federal University of Technology, Minna',
		highlight: 'Wrote my first Python script to automate data collection for my thesis.'
	}
];

// Grouped from the CV's skills list and the case studies
export const stack = [
	{ group: 'AI', items: ['OpenAI', 'Gemini', 'LangChain', 'RAG', 'Vector search', 'MCP', 'OpenCV'] },
	{ group: 'Backend', items: ['Python', 'FastAPI', 'Django', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis'] },
	{ group: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'SvelteKit'] },
	{ group: 'Infrastructure', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Pulumi'] }
];
