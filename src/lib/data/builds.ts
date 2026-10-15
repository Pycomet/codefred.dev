// Personal projects shown under "Things I've built" on /work.
// Own work only: no client or employer code. Facts come from each project's README.
// Add a link only when it's public and live, so visitors never hit a 404.

export interface Build {
	name: string;
	kind: 'Product' | 'Open source' | 'Side project' | 'Fast build';
	description: string; // one or two plain sentences
	stack: string[];
	link?: { label: string; url: string };
	image?: { src: string; alt: string }; // 16:10 screenshot in static/builds/
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
		name: 'Café Fausse',
		kind: 'Fast build',
		description:
			'A full restaurant site in 2-4 hours of hands-on work with Claude Code: menu, gallery, online reservations with table availability, a newsletter and a password-protected staff view, backed by an API with 49 tests.',
		stack: ['React', 'Flask', 'SQLAlchemy', 'Postgres'],
		link: { label: 'Try it', url: 'https://cafe-fausse-fe.vercel.app' }
	},
	{
		name: 'Vibe coding platform',
		kind: 'Side project',
		description:
			"Type a prompt and an agent builds and previews a full-stack app. Built on Vercel's open-source vibe coding template, with Trigger.dev and E2B added as the sandbox execution layer.",
		stack: ['Next.js', 'AI SDK', 'Trigger.dev', 'E2B'],
		link: { label: 'Try it', url: 'https://vibe-coding-e2b-trigger.vercel.app' }
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
		stack: ['Next.js', 'AI SDK', 'Firebase', 'Vercel Blob'],
		link: { label: 'Try it', url: 'https://pixelai-weld.vercel.app' }
	},
	{
		name: 'TripSplit',
		kind: 'Side project',
		description:
			'Splits group travel costs from a shared link, no accounts. Money is stored as integers and the balance maths is unit-tested to always sum to zero.',
		stack: ['Next.js', 'TypeScript', 'Drizzle', 'Postgres'],
		link: { label: 'Try it', url: 'https://tripsplit-eta.vercel.app' }
	}
];
