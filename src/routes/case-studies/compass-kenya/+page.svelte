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
	import { generateArticleSchema, generateBreadcrumbSchema } from '$lib/utils/structured-data';
	import { getCaseStudyBySlug } from '$lib/data/case-studies';

	const caseStudy = getCaseStudyBySlug('compass-kenya');
	const siteUrl = 'https://codefred.dev';
	const pageUrl = `${siteUrl}/case-studies/compass-kenya`;
	const publishedDate = '2026-07-10';
	const modifiedDate = new Date().toISOString().split('T')[0];
</script>

<SEO
	title="LLM Agent Optimization & Swahili NLP Case Study | Compass Kenya | Codefred"
	description="How I cut an AI career-guidance chatbot's worst-case conversations from 70 to 35 turns and enabled full Swahili support at 80%+ quality parity — evaluation harness first."
	canonical={pageUrl}
	ogType="article"
	article={{
		publishedTime: `${publishedDate}T00:00:00Z`,
		modifiedTime: `${modifiedDate}T00:00:00Z`,
		author: 'Alfred Emmanuel',
		tags: ['AI', 'LLM Agents', 'Swahili NLP', 'Evaluation', 'Python', 'Gemini']
	}}
/>

<svelte:head>
	{@html `<script type="application/ld+json">
		${generateArticleSchema({
			headline: caseStudy?.title || "Optimizing LLM Agents for Kenya's Job Seekers",
			description: "How I cut an AI career-guidance chatbot's worst-case conversations from 70 to 35 turns and enabled full Swahili support at 80%+ quality parity — evaluation harness first.",
			url: pageUrl,
			datePublished: `${publishedDate}T00:00:00Z`,
			dateModified: `${modifiedDate}T00:00:00Z`,
			author: {
				name: 'Alfred Emmanuel',
				url: siteUrl
			},
			image: `${siteUrl}/og-default.png`
		})}
	<\/script>`}
	{@html `<script type="application/ld+json">
		${generateBreadcrumbSchema([
			{ name: 'Home', url: siteUrl },
			{ name: 'Case Studies', url: `${siteUrl}/case-studies` },
			{ name: caseStudy?.title || 'Compass Kenya', url: pageUrl }
		])}
	<\/script>`}
</svelte:head>

<CaseStudyHero
	title="Optimizing LLM Agents for Kenya's Job Seekers (50% Shorter Conversations, Full Swahili Support)"
	client="Tabiya — Compass Kenya (Workforce AI, Nonprofit)"
	role="Full-Stack AI Developer"
	timeline="6 Months (5 Milestones)"
	stack={['Python', 'FastAPI', 'TypeScript', 'React', 'Gemini 2.5', 'MongoDB', 'GCP', 'Pulumi']}
/>

<div class="container-custom max-w-5xl py-12">
	<ContentSection title="The TL;DR">
		<p>
			<a href="https://compass.tabiya.org" target="_blank" rel="noopener noreferrer">Compass</a> is an
			AI career-guidance platform by Tabiya that interviews job seekers about their work history and maps
			what they've done to a formal skills taxonomy — including invisible work like informal trading,
			caregiving, and community roles. For the Kenya launch, the multi-agent LLM pipeline had a problem:
			conversations were long, repetitive, and English-only. In a market where many users pay per megabyte
			of data and speak Swahili first, every unnecessary turn was a user lost.
		</p>
	</ContentSection>

	<MetricsGrid
		metrics={[
			{ value: '50%', label: 'Shorter Conversations (Worst Case)', highlight: true },
			{ value: '80%+', label: 'Swahili Quality Parity', highlight: true },
			{ value: '5.0★', label: 'Client Rating, 5/5 Milestones', highlight: true }
		]}
	/>

	<ContentSection>
		<p class="text-lg text-text-primary font-semibold">
			Over five milestones I built an evaluation harness first, then used it to drive persona-aware
			conversation refactors, full Swahili enablement, and CV integration — cutting worst-case
			conversations from 70 to 35 turns and LLM calls by 20%, while holding skill-discovery quality
			at 85%+ overlap with baseline. 11 merged PRs across a Python + TypeScript codebase.
		</p>
	</ContentSection>

	<ContentSection title="The Problem: An Agent That Talked Too Much, in the Wrong Language">
		<p>
			Compass's core flow is "skills elicitation": a chain of LLM agents (welcome → collect experiences
			→ explore skills → farewell) interviews the user and extracts structured experience and skill data.
			It worked — but nobody could say precisely <em>how well</em>, and users were feeling the friction.
		</p>

		<CalloutBox type="warning" title="What the Baseline Runs Revealed">
			<p>
				My first deliverable was measurement, not fixes. I instrumented the E2E test suite with an
				automated metrics collector and ran repeated conversations across user personas. The numbers:
			</p>
			<ul>
				<li><strong>32.4 turns per conversation on average</strong> — and 70 turns in the worst case (a formal worker giving verbose, CV-style answers)</li>
				<li><strong>251 LLM calls per conversation</strong>, driving both cost and latency</li>
				<li><strong>11% question repetition rate</strong> — the agent re-asked things users had already answered</li>
				<li><strong>"Okay" started 27% of all agent questions</strong>; phrase diversity was just 15.4%</li>
				<li><strong>A hidden bug:</strong> the farewell agent was consuming 83% of processing time, making 64 LLM calls <em>after</em> the conversation had ended</li>
				<li><strong>English only</strong> — no path for the millions of Kenyan users who are more comfortable in Swahili or code-switch between the two</li>
			</ul>
		</CalloutBox>

		<p>
			The client's ask was specific: 20% faster conversations, 30% less repetition, Swahili support —
			without degrading the quality of the skills discovered. That last constraint is what makes this
			hard. Anyone can make a chatbot terser; keeping extraction quality while cutting turns requires
			knowing exactly what each turn contributes.
		</p>
	</ContentSection>

	<ContentSection title="The Solution: Evaluation Harness First, Then Optimize" variant="highlight">
		<p>
			You can't refactor prompts safely without a regression net. So the project was sequenced to build
			the net before touching the flows.
		</p>

		<h3>Phase 1: Baselines, Observability & CI Quality Gates</h3>
		<CalloutBox type="success" title="The Foundation">
			<ul>
				<li>Built a <strong>baseline metrics collector</strong> hooked into the E2E chat executor — turn counts, per-phase and per-agent timing, LLM call counts, semantic repetition rate, skill overlap</li>
				<li>Added <strong>correlation IDs and structured logging fields</strong> (session, turn, agent type, LLM call duration) across the backend, with a sensitive-data checklist so no PII ever hits the logs</li>
				<li>Created <strong>golden transcripts</strong> per persona and wired them into GitHub Actions: PRs fail if turn count, repetition, or skill overlap regress past thresholds</li>
			</ul>
		</CalloutBox>

		<h3>Phase 2: Persona-Aware Conversation Refactor</h3>
		<p>
			The data showed two very different users. An informal worker ("I sell vegetables at the market")
			needs scaffolding and examples. A formal worker reciting their CV needs the agent to
			<em>acknowledge what it already heard and stop re-asking</em>. I built a persona detector that
			classifies users from verbal cues — in both English and Swahili — and adapts prompts, probing
			depth, and exit criteria per persona. Combined with fixing the farewell agent and consolidating
			the skills-exploration loop, this took the worst-case formal-verbose persona from 70 turns to under 35.
		</p>

		<h3>Phase 3: Swahili Enablement</h3>
		<CalloutBox type="info" title="Localization Is Architecture, Not Translation">
			<ul>
				<li>Evaluated candidate models for Swahili quality/cost and standardized on <strong>Gemini 2.5 Flash</strong></li>
				<li>Built a <strong>synonym-mapping module</strong>: 50+ Swahili and Sheng job terms (formal like <em>mhasibu</em>/accountant, informal like <em>mama mboga</em>-style vendor roles) normalized to the ESCO skills taxonomy before retrieval</li>
				<li>Handled <strong>code-switching</strong> — real Kenyan users mix English and Swahili mid-sentence</li>
				<li>Enforced language consistency in prompts (no drift back to English) and shipped Swahili golden transcripts into the same CI gates</li>
			</ul>
		</CalloutBox>

		<h3>Phase 4: CV Integration</h3>
		<p>
			Uploaded CVs were dead-end data — extracted as plain text bullets that never reached the
			conversation. I built a structured extractor (title, company, dates, work type, responsibilities),
			a mapper that pre-populates the agent's state with deduplicated, provenance-tagged experiences,
			and prompt adaptations so the agent opens with <em>"I see from your CV that you worked as X at Y —
			tell me more"</em> instead of asking everything from scratch.
		</p>

		<h3>Phase 5: Hardening & Handover</h3>
		<p>
			Edge-case suites for the CV pipeline (corrupt files, contradictory data, mid-conversation uploads),
			post-secondary education collection so degree-derived skills rank alongside work skills, retry and
			graceful-degradation paths, and a full handover package. Along the way I also shipped SSE streaming
			for chat responses, an API-gateway migration (Pulumi IaC), and MongoDB index optimizations.
		</p>
	</ContentSection>

	<ContentSection title="The Technical Implementation">
		<p>
			The persona detector illustrates the approach: deterministic where possible, bilingual by design,
			and defaulting to the safer path for informal workers. Simplified from the production module:
		</p>
	</ContentSection>

	<CodeBlock
		language="python"
		title="Bilingual Persona Detection (simplified)"
		code={`class PersonaType(Enum):
    INFORMAL = "informal"  # task-oriented, informal workers
    FORMAL = "formal"      # structured, formal employment vocabulary

# English + Swahili cues, curated with local terminology review
FORMAL_INDICATORS = [
    "position", "department", "responsibilities", "reported to",
    "cheo",       # title/position
    "idara",      # department
    "mshahara",   # salary
    "mkataba",    # contract
]
INFORMAL_INDICATORS = [
    "daily work", "helped out", "hustle", "odd jobs",
    "kazi",             # work/tasks
    "biashara ndogo",   # small business
    "kuuza",            # selling
]

def detect_persona(user_messages: list[str]) -> PersonaType:
    text = " ".join(user_messages).lower()
    formal_score = sum(term in text for term in FORMAL_INDICATORS)
    informal_score = sum(term in text for term in INFORMAL_INDICATORS)

    if formal_score > informal_score and formal_score >= 2:
        return PersonaType.FORMAL
    # Default to INFORMAL: simpler language and more
    # scaffolding never hurts; skipped questions do.
    return PersonaType.INFORMAL

# Downstream: prompts, probing depth, and exit criteria
# all branch on the detected persona — and every change is
# gated by golden-transcript thresholds in CI.`}
	/>

	<ContentSection title="The Outcome">
		<p>
			Every improvement below is measured by the same harness that established the baseline — not
			estimated, and protected against regression on every PR since.
		</p>
	</ContentSection>

	<ComparisonTable
		rows={[
			{ metric: 'Worst-Case Conversation', before: '70 turns', after: '≤35 turns', change: '-50%' },
			{ metric: 'Average Turn Count', before: '32.4 turns', after: '≤27 turns', change: '-17%' },
			{ metric: 'LLM Calls per Conversation', before: '251', after: '≤200', change: '-20%' },
			{ metric: 'Question Repetition Rate', before: '11%', after: '≤8%', change: '-27%' },
			{ metric: 'Phrase Diversity', before: '15.4%', after: '35%+', change: '2.3x' },
			{ metric: 'Languages Supported', before: 'English only', after: 'English + Swahili', change: '80%+ parity' }
		]}
	/>

	<Testimonial
		quote="Emmanuel demonstrated a rapid understanding of our complex system. He didn't just execute the basic requirements; he proactively suggested forward-looking and sustainable code edits that significantly improved our Python and TypeScript codebase... He is reliable, incredibly quick, and documents his work thoroughly. I would absolutely hire him again and highly recommend him to any client looking for a dedicated and highly skilled AI developer."
		author="Upwork Client Review (5.0★)"
		role="Compass — Tabiya"
	/>

	<ContentSection title="The Lesson" variant="dark">
		<p class="text-lg text-text-primary font-semibold">
			You can't optimize an LLM agent you can't measure — and you can't localize one by translating strings.
		</p>
		<p>
			The single highest-leverage deliverable in this project was the evaluation harness. It found a bug
			nobody knew existed (83% of processing time spent after the conversation ended), it made every
			prompt refactor safe to ship, and it turned "the bot feels better" into numbers a client can sign
			off on. The Swahili work taught the second lesson: real localization lives in the retrieval layer,
			the taxonomy mapping, and the persona logic — the translated prompts are the easy 10%.
		</p>

		<CalloutBox type="tip" title="Key Takeaways">
			<ul>
				<li><strong>Harness before optimization:</strong> baseline metrics + CI quality gates make aggressive prompt refactors safe</li>
				<li><strong>Personas beat averages:</strong> the same flow that suits an informal trader wastes 40 turns on a formal worker — detect and adapt</li>
				<li><strong>Localization is an architecture problem:</strong> synonym mapping to the taxonomy and code-switch handling mattered more than translation</li>
				<li><strong>Instrument everything:</strong> the biggest performance bug was invisible until per-agent timing existed</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<CaseStudyCTA
		title="Have an LLM agent that needs to get faster, cheaper, or multilingual?"
		description="I optimize production AI systems with evaluation-first discipline — measured improvements, not vibes. Book a consultation."
	/>
</div>
