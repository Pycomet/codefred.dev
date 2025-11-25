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
	title="AI Cost Reduction Case Study | Cut Costs by 92% | Codefred"
	description="How I reduced a FinTech startup's OpenAI bills from $60K/month to $4.8K while improving latency by 400ms using semantic caching and model routing."
	canonical="https://codefred.dev/case-studies/cost-reduction"
/>

<CaseStudyHero
	title="How I Cut AI Infrastructure Costs by 90% (While Improving Latency)"
	client="Series B SaaS (FinTech)"
	role="Technical Consultant"
	timeline="3 Weeks"
	stack={['Python', 'FastAPI', 'Redis', 'OpenAI', 'HuggingFace', 'Vector Store']}
/>

<div class="container-custom max-w-5xl py-12">
	<ContentSection title="The TL;DR">
		<p>
			A high-growth FinTech startup was burning $60,000/month on OpenAI API bills. Their product (an intelligent document processor) relied on GPT-4 for every single user interaction.
		</p>
	</ContentSection>

	<MetricsGrid
		metrics={[
			{ value: '92%', label: 'Cost Reduction', highlight: true },
			{ value: '3x', label: 'Faster Response', highlight: true },
			{ value: '$55K', label: 'Saved Monthly', highlight: true }
		]}
	/>

	<ContentSection>
		<p class="text-lg text-text-primary font-semibold">
			By implementing a semantic caching layer and a "Model Routing" architecture, I reduced their monthly bill to $4,800 (92% reduction) while improving average response times by 400ms.
		</p>
	</ContentSection>

	<ContentSection title="The Problem: The 'Ferrari for Pizza Delivery' Anti-Pattern">
		<p>
			When the client approached me, they were in panic mode. Their user base had doubled in Q3, but their infrastructure costs had quadrupled. They were essentially losing money on every active user.
		</p>

		<CalloutBox type="warning" title="The Diagnosis">
			<p>I spent the first 48 hours analyzing their access logs and <code>prompts.py</code> file. The issue wasn't their prompt engineering; it was their architecture.</p>
			<ul>
				<li><strong>Universal Usage:</strong> They were sending everything to gpt-4-32k. Even simple "Hello" messages or basic "Extract the date from this text" tasks.</li>
				<li><strong>Zero Memory:</strong> If User A asked a question, and User B asked the exact same question 5 minutes later, they paid for the answer twice.</li>
				<li><strong>The Wrapper Trap:</strong> The backend was essentially just a thin wrapper around the OpenAI API, with no logic to handle load or cost optimization.</li>
			</ul>
		</CalloutBox>

		<p>
			They were using a Ferrari to deliver pizza. It worked, but the gas bill was bankrupting them.
		</p>
	</ContentSection>

	<ContentSection title="The Solution: The Intelligent Router Architecture" variant="highlight">
		<p>
			We didn't rewrite their product; we put a traffic controller in front of it.
		</p>

		<h3>Phase 1: Semantic Caching (The "Free" Wins)</h3>
		<p>
			Before a request ever touches an LLM, it should check if we've answered it before. Standard string matching doesn't work for AI (e.g., "What's the date?" vs "Tell me today's date").
		</p>

		<CalloutBox type="success" title="The Fix">
			<ul>
				<li>Implemented Redis Vector Store to store embeddings of previous queries</li>
				<li>Incoming queries are embedded (using a cheap model like text-embedding-3-small) and compared against the cache</li>
				<li><strong>Impact:</strong> 35% of traffic was instantly resolved from cache</li>
				<li><strong>Cost:</strong> $0 (Redis was already in their stack)</li>
				<li><strong>Latency:</strong> &lt; 20ms (vs 2s for GPT-4)</li>
			</ul>
		</CalloutBox>

		<h3>Phase 2: Model Routing (The "Good Enough" Principle)</h3>
		<p>
			Not every task requires a PhD-level intelligence. Most tasks just need a high school graduate.
		</p>

		<CalloutBox type="info" title="The Fix">
			<p>I built a classification layer (using a fine-tuned DistilBERT model running locally) that analyzes the complexity of the prompt and routes it accordingly:</p>
			<ul>
				<li><strong>Tier 1 (Simple/Format):</strong> Route to a local model (Mistral-7B via vLLM). Cost: Fixed server cost (negligible per token).</li>
				<li><strong>Tier 2 (Reasoning):</strong> Route to gpt-3.5-turbo or claude-instant. Cost: Cheap.</li>
				<li><strong>Tier 3 (Complex/Creative):</strong> Route to gpt-4. Cost: Expensive (Reserved only for the hardest 5% of queries).</li>
			</ul>
		</CalloutBox>

		<h3>Phase 3: Aggressive Output Structured Parsing</h3>
		<p>
			The client was paying for verbose "chatty" responses when they just needed JSON. I forced structured outputs and reduced token generation limits, cutting average response token count by 40%.
		</p>
	</ContentSection>

	<ContentSection title="The Technical Implementation">
		<p>Here is the simplified logic of the router we deployed:</p>
	</ContentSection>

	<CodeBlock
		language="python"
		title="Traffic Controller Logic"
		code={`# Conceptual logic of the Traffic Controller

async def route_request(user_query: str):
    # 1. Check Cache (Vector Search)
    cached_response = await vector_db.search(user_query, threshold=0.92)
    if cached_response:
        return cached_response

    # 2. Classify Complexity (Local Model)
    complexity_score = await classifier.predict(user_query)

    # 3. Route to appropriate model
    if complexity_score < 0.3:
        # Use local Mistral instance
        response = await local_llm.generate(user_query)
    elif complexity_score < 0.7:
        # Use mid-tier API
        response = await openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=[...]
        )
    else:
        # Use the big guns
        response = await openai.ChatCompletion.create(
            model="gpt-4", messages=[...]
        )

    # 4. Async Cache Write
    background_tasks.add_task(vector_db.save, user_query, response)

    return response`}
	/>

	<ContentSection title="The Outcome">
		<p>
			We deployed this to production on a Tuesday night. By Wednesday morning, the results were visible on the dashboard.
		</p>
	</ContentSection>

	<ComparisonTable
		rows={[
			{ metric: 'Monthly Cost', before: '$62,400', after: '$4,850', change: '-92%' },
			{ metric: 'Avg Latency', before: '2.4s', after: '0.8s', change: '3x Faster' },
			{ metric: 'Reliability', before: '99.1%', after: '99.9%', change: 'No Rate Limits' }
		]}
	/>

	<Testimonial
		quote="Codefred didn't just fix the code; he fixed our unit economics. We were worried reducing costs would hurt quality, but the system is actually faster and smarter now because we aren't forcing GPT-4 to do data entry."
		author="James K."
		role="CTO"
	/>

	<ContentSection title="The Lesson" variant="dark">
		<p>
			If you are building AI products in production, you are not a prompt engineer; you are a systems architect.
		</p>
		<p>
			The easy part is making the AI do something cool. The hard part is making the unit economics work at scale. If your cloud bill is giving you anxiety, you usually don't need better prompts—you need better architecture.
		</p>

		<CalloutBox type="tip" title="Key Takeaways">
			<ul>
				<li><strong>Semantic caching</strong> is table stakes for any production LLM application</li>
				<li><strong>Model routing</strong> can save 80%+ on costs without sacrificing quality</li>
				<li><strong>Structured outputs</strong> reduce token waste dramatically</li>
				<li><strong>Architecture > Prompts</strong> when it comes to cost optimization</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<CaseStudyCTA />
</div>
