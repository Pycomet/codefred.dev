<script lang="ts">
	import CaseStudyHero from '$lib/components/case-study/CaseStudyHero.svelte';
	import MetricsGrid from '$lib/components/case-study/MetricsGrid.svelte';
	import ContentSection from '$lib/components/case-study/ContentSection.svelte';
	import CodeBlock from '$lib/components/case-study/CodeBlock.svelte';
	import Testimonial from '$lib/components/case-study/Testimonial.svelte';
	import ComparisonTable from '$lib/components/case-study/ComparisonTable.svelte';
	import CalloutBox from '$lib/components/case-study/CalloutBox.svelte';
	import CaseStudyCTA from '$lib/components/case-study/CaseStudyCTA.svelte';
	import SEO from '$components/SEO.svelte';
</script>

<SEO
	title="GrindProof: My Architecture Laboratory | Codefred"
	description="How I use my own SaaS product to battle-test architecture patterns before recommending them to clients. Real users, real money, real lessons."
	canonical="https://codefred.dev/case-studies/grindproof-lab"
/>

<CaseStudyHero
	title="GrindProof: My Architecture Laboratory"
	client="Personal SaaS Product"
	role="Founder & Lead Architect"
	timeline="Ongoing"
	stack={['SvelteKit', 'Supabase', 'Anthropic Claude', 'Stripe', 'PostgreSQL']}
/>

<div class="container-custom max-w-5xl py-12">
	<ContentSection title="Why This Matters to You">
		<p class="text-lg text-text-primary font-semibold">
			When I recommend an architecture pattern or tech stack to clients, they deserve to know it works. GrindProof is where I test those patterns <strong>with my own money</strong> before putting them in your production.
		</p>
	</ContentSection>

	<MetricsGrid
		metrics={[
			{ value: '100%', label: 'Uptime (3 months)', highlight: true },
			{ value: '<200ms', label: 'Avg Response Time', highlight: true },
			{ value: '$0', label: 'Unexpected Costs', highlight: true }
		]}
	/>

	<CalloutBox type="info" title="The Truth">
		<p>
			This isn't a side hustle distracting me from client work. It's a controlled experiment where I prove architecture decisions work under real load before recommending them.
		</p>
	</CalloutBox>

	<ContentSection title="The Concept: AI Accountability That Actually Works">
		<p>
			Content creators struggle with accountability. They set goals ("post 3 times a week") but life happens. Traditional accountability partners are unreliable.
		</p>

		<div class="my-6 bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
			<h4 class="font-semibold text-brand-primary mb-4">GrindProof's Promise:</h4>
			<ul class="space-y-2">
				<li>Creators set public commitments</li>
				<li>AI (Claude) checks if they followed through</li>
				<li>If they fail, they pay a penalty (goes to charity or friends)</li>
				<li>Public dashboard shows their streak</li>
			</ul>
		</div>

		<CalloutBox type="success" title="Why AI?">
			<ol>
				<li>AI doesn't sleep, forget, or have its own problems</li>
				<li>Can verify completion from screenshots, links, or check-ins</li>
				<li>Scales to thousands of users without hiring humans</li>
			</ol>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="The Technical Challenge: Trust at Scale" variant="highlight">
		<p>
			Building an AI accountability system means solving problems most SaaS doesn't face:
		</p>

		<CalloutBox type="warning" title="The Stakes">
			<ul>
				<li>Users are putting real money on the line</li>
				<li>False positives (AI says you failed when you didn't) = lawsuit territory</li>
				<li>False negatives (AI says you passed when you didn't) = platform loses credibility</li>
				<li>Downtime during verification window = user anger</li>
			</ul>
		</CalloutBox>

		<p class="text-lg text-text-primary font-semibold">
			This isn't a todo app where bugs are forgiven. This is "AI holding your money hostage" - it has to be bulletproof.
		</p>
	</ContentSection>

	<ContentSection title="Architecture Decisions (And Why They Transfer to Client Work)">
		<h3>Decision 1: SvelteKit Over Next.js</h3>
		<p><strong>Why:</strong> Faster server-side rendering, better DX, smaller bundle sizes</p>
		<CalloutBox type="tip" title="Client Benefit">
			<p>
				The patterns I build here (form handling, API routes, SSR) transfer directly to client projects. When I say "SvelteKit is faster," I can show the Lighthouse scores from GrindProof.
			</p>
		</CalloutBox>

		<h3>Decision 2: Supabase for Everything</h3>
		<p><strong>Why:</strong> PostgreSQL + Auth + Realtime + Storage in one package</p>
		
		<div class="my-6 bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
			<h4 class="font-semibold text-text-primary mb-3">The Test: Can Supabase handle:</h4>
			<ul class="space-y-2">
				<li>Concurrent webhook processing (Stripe + AI callbacks)?</li>
				<li>Real-time leaderboard updates?</li>
				<li>Complex row-level security rules?</li>
			</ul>
		</div>

		<CalloutBox type="success" title="Result: Yes, but with caveats">
			<ul>
				<li>RLS policies get complex fast (documented all edge cases)</li>
				<li>Need connection pooling for serverless (learned the hard way)</li>
				<li>Realtime subscriptions need cleanup or memory leaks (found and fixed)</li>
			</ul>
		</CalloutBox>

		<CalloutBox type="tip" title="Client Benefit">
			<p>
				When I recommend Supabase, I can say "here's exactly where it will bite you, and here's how to avoid it."
			</p>
		</CalloutBox>

		<h3>Decision 3: Claude over GPT-4 for Verification</h3>
		<p><strong>Why:</strong> Better at following instructions, less likely to hallucinate</p>
		<p><strong>The Test:</strong> Can Claude reliably verify accountability from messy user inputs (screenshots, URLs, text)?</p>
	</ContentSection>

	<CodeBlock
		language="typescript"
		title="Verification Pipeline"
		code={`// Verification pipeline
async function verifyCommitment(commitment, evidence) {
  // 1. Structured prompt (tested 50+ iterations)
  const prompt = buildVerificationPrompt(commitment, evidence);

  // 2. Call Claude with strict output format
  const result = await claude.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 500,
    messages: [{
      role: "user",
      content: prompt
    }]
  });

  // 3. Parse structured response
  const verification = parseVerification(result.content);

  // 4. Human review flag for low confidence
  if (verification.confidence < 0.85) {
    await flagForHumanReview(commitment.id);
  }

  return verification;
}`}
	/>

	<ContentSection>
		<CalloutBox type="success" title="Learnings">
			<ul>
				<li>Claude is more reliable than GPT-4 for binary decisions (did they do it: yes/no)</li>
				<li>Need confidence scores + human review for edge cases</li>
				<li>Structured outputs > parsing free-form text</li>
				<li>Cost per verification: ~$0.02 (cheaper than human reviewers)</li>
			</ul>
		</CalloutBox>

		<CalloutBox type="tip" title="Client Benefit">
			<p>
				When building AI features, I know exactly how to prompt for reliability, not just "cool demos."
			</p>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="What I'm Testing Right Now">
		<div class="grid md:grid-cols-2 gap-6 my-6">
			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">Current Tests:</h4>
				<ol class="space-y-2 text-sm">
					<li><strong>Stripe metered billing</strong> - Usage-based pricing for AI verifications</li>
					<li><strong>Real-time leaderboards</strong> - Supabase Realtime with 1000+ concurrent users</li>
					<li><strong>AI prompt versioning</strong> - A/B testing prompts without redeploying</li>
					<li><strong>Progressive enhancement</strong> - Works without JS (SvelteKit SSR)</li>
				</ol>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">Why This Matters to You:</h4>
				<ul class="space-y-2 text-sm">
					<li>Your project won't be the first time I've done metered billing</li>
					<li>I've already debugged the Supabase Realtime scaling issues</li>
					<li>Prompt versioning system is ready to copy-paste into your AI product</li>
				</ul>
			</div>
		</div>
	</ContentSection>

	<ContentSection title="The Numbers (Brutal Honesty)">
		<ComparisonTable
			title="Current Metrics"
			rows={[
				{ metric: 'Monthly Active Users', before: '', after: '47' },
				{ metric: 'Revenue', before: '', after: '$280 MRR' },
				{ metric: 'Infrastructure Cost', before: '', after: '$45/month' },
				{ metric: 'Gross Margin', before: '', after: '84%' },
				{ metric: 'Uptime', before: '', after: '100% (since launch)' }
			]}
		/>

		<CalloutBox type="info" title="Why I'm Sharing This">
			<p>Not to brag (47 users isn't impressive). But to show:</p>
			<ul>
				<li>The architecture scales beyond current usage</li>
				<li>Costs are predictable and low</li>
				<li>The system doesn't break under load spikes</li>
			</ul>
			<p class="mt-3 font-semibold">When I tell clients "this will cost ~$50/month to run," it's not a guess.</p>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="What You Get From This" variant="highlight">
		<p>When you hire me, you're not just getting my consulting time. You're getting:</p>

		<div class="grid md:grid-cols-2 gap-6 my-6">
			<div class="bg-bg-primary rounded-lg p-6 border border-brand-primary/20">
				<div class="text-3xl mb-3">🛡️</div>
				<h4 class="font-semibold text-text-primary mb-2">Battle-tested patterns</h4>
				<p class="text-sm text-text-secondary">Every architecture I recommend has been stress-tested in GrindProof</p>
			</div>

			<div class="bg-bg-primary rounded-lg p-6 border border-brand-primary/20">
				<div class="text-3xl mb-3">💰</div>
				<h4 class="font-semibold text-text-primary mb-2">Honest cost estimates</h4>
				<p class="text-sm text-text-secondary">I know exactly what Supabase/Claude/Stripe costs at scale</p>
			</div>

			<div class="bg-bg-primary rounded-lg p-6 border border-brand-primary/20">
				<div class="text-3xl mb-3">🐛</div>
				<h4 class="font-semibold text-text-primary mb-2">Real debugging experience</h4>
				<p class="text-sm text-text-secondary">I've hit and fixed the edge cases before your users do</p>
			</div>

			<div class="bg-bg-primary rounded-lg p-6 border border-brand-primary/20">
				<div class="text-3xl mb-3">💻</div>
				<h4 class="font-semibold text-text-primary mb-2">Code I can show</h4>
				<p class="text-sm text-text-secondary">Want to see how I handle webhook retries? It's in GrindProof</p>
			</div>
		</div>
	</ContentSection>

	<ContentSection title="The Lesson" variant="dark">
		<p class="text-lg text-text-primary font-semibold mb-4">
			I don't just read Hacker News and recommend trends. I build real products, with real users, and real money on the line.
		</p>

		<CalloutBox type="tip" title="My Promise">
			<ul>
				<li>I won't recommend tech I haven't personally deployed</li>
				<li>I won't guess at costs - I'll show you my bills</li>
				<li>I won't hand-wave scaling - I'll show you load test results</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<Testimonial
		quote="Other consultants talk about best practices. Codefred shows me his production monitoring dashboard."
		author="GrindProof Beta User"
		role="Who also became a client"
	/>

	<div class="text-center my-12">
		<p class="text-text-secondary mb-4">Want to see it live?</p>
		<a
			href="https://grindproof.co"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all"
		>
			Check out GrindProof
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
			</svg>
		</a>
	</div>

	<CaseStudyCTA title="Want architecture like this?" description="Let's talk about your project and how I can apply these battle-tested patterns to your production system." />
</div>
