// Personal projects shown under "Things I've built" on /work.
// Own work only: no client or employer code. Facts come from each project's README.
// Add a link only when it's public and live, so visitors never hit a 404.

export interface Build {
	name: string;
	kind: 'Product' | 'Open source' | 'Side project' | 'Demo';
	description: string; // one or two plain sentences
	stack: string[];
	link?: { label: string; url: string };
}

export const builds: Build[] = [
	{
		name: 'GrindProof',
		kind: 'Product',
		description:
			'An AI accountability app. Plan the day in the morning, mark what got done in the evening, and get a weekly AI roast for the gap.',
		stack: ['Next.js', 'Supabase', 'tRPC', 'Gemini', 'MCP', 'Expo'],
		link: { label: 'grindproof.co', url: 'https://grindproof.co' }
	},
	{
		name: 'o-agent-core',
		kind: 'Open source',
		description:
			'A minimal, readable AI agent in Python. Give it a goal and get the answer plus a step-by-step trace of every tool call. MIT licensed.',
		stack: ['Python', 'FastAPI', 'OpenAI'],
		link: { label: 'GitHub', url: 'https://github.com/Pycomet/o-agent-core' }
	},
	{
		name: 'PixelAI',
		kind: 'Side project',
		description:
			'An AI thumbnail generator across five image providers, with per-user daily quotas, cloud storage and generation history.',
		stack: ['Next.js', 'AI SDK', 'Firebase', 'Vercel Blob']
	},
	{
		name: 'TripSplit',
		kind: 'Side project',
		description:
			'Splits group travel costs from a shared link, no accounts. Money is stored as integers and the balance maths is unit-tested to always sum to zero.',
		stack: ['Next.js', 'TypeScript', 'Drizzle', 'Postgres']
	},
	{
		name: 'WhatsApp front desk',
		kind: 'Demo',
		description:
			'An LLM front desk for a fictional dental clinic on the WhatsApp Cloud API. It answers questions and handles booking requests.',
		stack: ['Python', 'FastAPI', 'OpenAI', 'WhatsApp Cloud API']
	}
];
