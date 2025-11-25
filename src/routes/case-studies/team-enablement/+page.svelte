<script lang="ts">
	import CaseStudyHero from '$lib/components/case-study/CaseStudyHero.svelte';
	import MetricsGrid from '$lib/components/case-study/MetricsGrid.svelte';
	import ContentSection from '$lib/components/case-study/ContentSection.svelte';
	import CalloutBox from '$lib/components/case-study/CalloutBox.svelte';
	import CaseStudyCTA from '$lib/components/case-study/CaseStudyCTA.svelte';
	import SEO from '$components/SEO.svelte';
</script>

<SEO
	title="Team Enablement & AI Delivery Coaching | Codefred"
	description="Embedded with a seed-stage team to rebuild delivery rituals and ship AI features confidently. 5 engineers coached, 3 features launched, 2x release velocity."
	canonical="https://codefred.dev/case-studies/team-enablement"
/>

<CaseStudyHero
	title="Team Enablement & AI Delivery Coaching"
	client="Seed Stage SaaS"
	role="Fractional Head of AI"
	timeline="5 Weeks"
	stack={['Next.js', 'FastAPI', 'PostgreSQL', 'LangChain', 'OpenAI', 'Supabase']}
/>

<div class="container-custom max-w-5xl py-12">
	<ContentSection title="TL;DR">
		<p class="text-lg text-text-primary font-semibold">
			The founding team had a working prototype but zero confidence shipping AI features to production. I embedded with their five engineers, rebuilt their delivery rituals, and co-implemented the first three AI-powered workflows. By the time I rolled off, they were shipping without me.
		</p>
	</ContentSection>

	<MetricsGrid
		metrics={[
			{ value: '5', label: 'Engineers Coached', highlight: true },
			{ value: '3', label: 'AI Features Launched', highlight: true },
			{ value: '2x', label: 'Release Velocity', highlight: true }
		]}
	/>

	<ContentSection title="What Was Broken" variant="highlight">
		<CalloutBox type="warning" title="The Problems">
			<ul>
				<li>The team shipped to staging only once every two weeks</li>
				<li>No one could explain how prompts were evaluated—QA literally eyeballed random outputs</li>
				<li>Webhooks failed silently because no one owned observability</li>
				<li>Knowledge was stuck in the CTO's head</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="The Playbook">
		<div class="space-y-8">
			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<div class="flex items-start gap-4">
					<div class="text-3xl">📐</div>
					<div>
						<h3 class="text-xl font-semibold text-brand-primary mb-2">1. Architecture Guardrails</h3>
						<p class="text-text-secondary">
							Documented how data flows between Supabase, FastAPI, and OpenAI. Added sequence diagrams inside Notion so onboarding took hours, not weeks.
						</p>
					</div>
				</div>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<div class="flex items-start gap-4">
					<div class="text-3xl">✅</div>
					<div>
						<h3 class="text-xl font-semibold text-brand-primary mb-2">2. Evaluation Harnesses</h3>
						<p class="text-text-secondary">
							Built a LangChain evaluation notebook + Supabase table to score prompts deterministically. Engineers finally had a red/green signal.
						</p>
					</div>
				</div>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<div class="flex items-start gap-4">
					<div class="text-3xl">👥</div>
					<div>
						<h3 class="text-xl font-semibold text-brand-primary mb-2">3. Pair Programming Sprints</h3>
						<p class="text-text-secondary">
							Sat with each engineer to implement one AI workflow end to end (ingestion → vector store → API → UI).
						</p>
					</div>
				</div>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<div class="flex items-start gap-4">
					<div class="text-3xl">🔧</div>
					<div>
						<h3 class="text-xl font-semibold text-brand-primary mb-2">4. Ops Hardening</h3>
						<p class="text-text-secondary">
							Added retry/backoff policies, structured logging, and a "pager" rotation so production incidents weren't guesswork.
						</p>
					</div>
				</div>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<div class="flex items-start gap-4">
					<div class="text-3xl">📚</div>
					<div>
						<h3 class="text-xl font-semibold text-brand-primary mb-2">5. Playbooks</h3>
						<p class="text-text-secondary">
							Captured seven SOPs (deploying embeddings, rotating keys, debugging prompts, etc.) so the team had references after I left.
						</p>
					</div>
				</div>
			</div>
		</div>
	</ContentSection>

	<ContentSection title="The Architecture Flow">
		<div class="my-8 bg-bg-secondary rounded-xl p-8 border border-brand-primary/20">
			<h4 class="font-semibold text-brand-primary mb-6 text-center">Data Enrichment Workflow</h4>
			<div class="space-y-4 text-sm">
				<div class="flex items-center gap-4">
					<div class="w-24 text-right text-text-muted font-mono">UI</div>
					<div class="flex-1 bg-bg-accent rounded p-3 border border-brand-primary/20">
						Submit data for enrichment
					</div>
				</div>
				<div class="flex items-center gap-4">
					<div class="w-24 text-right text-text-muted font-mono">API</div>
					<div class="flex-1 bg-bg-accent rounded p-3 border border-brand-primary/20">
						Persist payload + job id → Return 202 Accepted
					</div>
				</div>
				<div class="flex items-center gap-4">
					<div class="w-24 text-right text-text-muted font-mono">Worker</div>
					<div class="flex-1 bg-bg-accent rounded p-3 border border-brand-primary/20">
						Queue job (Redis) → Call LLM with guarded prompt
					</div>
				</div>
				<div class="flex items-center gap-4">
					<div class="w-24 text-right text-text-muted font-mono">LLM</div>
					<div class="flex-1 bg-bg-accent rounded p-3 border border-brand-primary/20">
						Return structured JSON result
					</div>
				</div>
				<div class="flex items-center gap-4">
					<div class="w-24 text-right text-text-muted font-mono">Worker</div>
					<div class="flex-1 bg-bg-accent rounded p-3 border border-brand-primary/20">
						Store result + evaluation score → Emit webhook
					</div>
				</div>
				<div class="flex items-center gap-4">
					<div class="w-24 text-right text-text-muted font-mono">API</div>
					<div class="flex-1 bg-bg-accent rounded p-3 border border-brand-primary/20">
						SSE pushes progress updates to UI
					</div>
				</div>
			</div>
		</div>
	</ContentSection>

	<ContentSection title="Outcome" variant="highlight">
		<CalloutBox type="success" title="Results">
			<ul>
				<li>Team ships twice a week with automated evaluation gates</li>
				<li>Founders have visibility through dashboards + alerts</li>
				<li>Engineers own the system; I'm on a lightweight advisory retainer only</li>
			</ul>
		</CalloutBox>

		<div class="mt-8 grid md:grid-cols-3 gap-6">
			<div class="text-center p-6 bg-bg-secondary rounded-lg border border-brand-primary/20">
				<div class="text-4xl font-bold gradient-text mb-2">2x</div>
				<div class="text-sm text-text-muted">Faster Releases</div>
			</div>
			<div class="text-center p-6 bg-bg-secondary rounded-lg border border-brand-primary/20">
				<div class="text-4xl font-bold gradient-text mb-2">100%</div>
				<div class="text-sm text-text-muted">Team Confidence</div>
			</div>
			<div class="text-center p-6 bg-bg-secondary rounded-lg border border-brand-primary/20">
				<div class="text-4xl font-bold gradient-text mb-2">7</div>
				<div class="text-sm text-text-muted">SOPs Created</div>
			</div>
		</div>
	</ContentSection>

	<ContentSection title="The Lesson" variant="dark">
		<p class="text-lg text-text-primary font-semibold mb-4">
			Most AI teams don't need more models—they need better processes. Shipping AI reliably is 30% prompts, 70% engineering discipline.
		</p>

		<CalloutBox type="tip" title="Key Takeaways">
			<ul>
				<li><strong>Documentation beats tribal knowledge:</strong> Write it down or it doesn't exist</li>
				<li><strong>Evaluation is non-negotiable:</strong> You can't improve what you don't measure</li>
				<li><strong>Pair programming transfers knowledge:</strong> Better than any workshop</li>
				<li><strong>Observability prevents firefighting:</strong> See problems before users do</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<CaseStudyCTA 
		title="Need an embedded lead to unblock your internal team?"
		description="I can help your engineers ship AI features confidently through hands-on coaching, architecture reviews, and process improvements."
	/>
</div>
