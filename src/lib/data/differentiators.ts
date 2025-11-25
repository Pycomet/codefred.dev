export interface Differentiator {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export const differentiators: Differentiator[] = [
	{
		id: 'honest-feedback',
		title: "I'll Tell You If AI Won't Solve Your Problem",
		description:
			"Not every problem needs AI. I've turned down projects where a simple SQL query would do the job. You get honest technical guidance, not sales pitches.",
		icon: 'truth'
	},
	{
		id: 'production-tested',
		title: 'Battle-Tested Patterns, Not Blog Post Theory',
		description:
			"Every architecture I recommend runs in my own production systems first (GrindProof). You get patterns proven with real users and real money, not just Hacker News trends.",
		icon: 'shield'
	},
	{
		id: 'real-costs',
		title: 'Actual Cost Estimates, Not Guesses',
		description:
			"I show you my own AWS/Supabase/OpenAI bills. When I say 'this will cost $500/month,' it's based on real data from systems I run, not napkin math.",
		icon: 'calculator'
	},
	{
		id: 'ship-fast',
		title: 'Ship in Weeks, Not Months',
		description:
			"I don't do 6-month consulting engagements. Most problems can be solved in 3-8 weeks. If yours can't, I'll tell you upfront what the blockers are.",
		icon: 'rocket'
	},
	{
		id: 'african-perspective',
		title: 'I Build for Unreliable Infrastructure',
		description:
			"Based in Nigeria, I design systems that work when power cuts out, internet is spotty, and users are on 3G. Your 'edge cases' are my daily reality.",
		icon: 'globe'
	}
];
