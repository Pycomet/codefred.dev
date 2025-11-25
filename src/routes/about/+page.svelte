<script lang="ts">
	import { personalData } from '$data/personal';
	import Card from '$components/ui/Card.svelte';
	import Badge from '$components/ui/Badge.svelte';
	import SEO from '$components/SEO.svelte';
</script>

<SEO
	title="About Me | Codefred - AI Systems Architect Journey"
	description="From Mechanical Engineering to AI Architecture. 8 years building production systems across Nigeria and globally. Based in Abuja, working with clients worldwide."
	canonical="https://codefred.dev/about"
	ogImage="/og-about.png"
/>

<div class="py-20 bg-bg-primary">
	<div class="container-custom max-w-4xl">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="mb-6">
				<img
					src="/profile.png"
					alt="Codefred"
					class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-brand-primary/20"
				/>
			</div>
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text mb-4">
				About Me
			</h1>
			<p class="text-xl text-text-secondary">
				How I went from Mechanical Engineering to building AI systems that actually work
			</p>
		</div>

		<!-- The Story -->
		<div class="prose prose-invert prose-lg max-w-none mb-16">
			<h2>The Unconventional Path</h2>
			<p>
				I started as a Mechanical Engineering student in Nigeria. While my classmates were designing engines, I was building web scrapers and automating data collection for research projects. The engineering mindset stuck with me: <strong>systems thinking, failure analysis, and obsession with efficiency.</strong>
			</p>

			<p>
				Fast forward 8 years: I've shipped 50+ production systems, cut AI costs by 92% for FinTech clients, and built computer vision systems processing 50+ camera streams across Nigerian retail stores. The path wasn't traditional, but it gave me something most developers don't have: <strong>real-world constraints.</strong>
			</p>

			<h2>Why Nigeria Matters</h2>
			<p>
				Building software in Abuja isn't like building in San Francisco. Power cuts out mid-deployment. Internet is unreliable. Users are on 3G. Your "edge cases" are my daily reality.
			</p>

			<p>
				This forced me to design systems that are <strong>resilient by default</strong>. When I recommend an architecture, it's battle-tested against:
			</p>
			<ul>
				<li>Frequent power outages (UPS + graceful degradation)</li>
				<li>Spotty internet (offline-first, aggressive caching)</li>
				<li>Low-bandwidth users (optimized assets, lazy loading)</li>
				<li>Cost constraints (every dollar matters at Nigerian SaaS margins)</li>
			</ul>

			<h2>The GrindProof Philosophy</h2>
			<p>
				I don't recommend technology I haven't personally deployed. <a href="/case-studies/grindproof">GrindProof</a> (my AI accountability SaaS) is my architecture laboratory. Every pattern I suggest - Supabase RLS, Claude API integration, Stripe webhooks - runs in my production with real users and real money on the line.
			</p>

			<p>
				When I tell you "this will cost $50/month," it's not a guess. I'm showing you my actual bills.
			</p>

			<h2>What I Actually Do</h2>
			<p>I help companies with three main problems:</p>
			<ol>
				<li><strong>AI Cost Optimization:</strong> Your GPT-4 bill is $60K/month and growing. I implement semantic caching + model routing to cut it by 90%.</li>
				<li><strong>Production AI Systems:</strong> You built a cool demo, but it breaks in production. I architect systems that scale reliably.</li>
				<li><strong>Technical Leadership:</strong> Your team needs guidance on AI strategy, architecture decisions, or technology choices. I don't just consult - I show you the code.</li>
			</ol>

			<h2>The Honest Approach</h2>
			<p>
				I'll tell you if AI won't solve your problem. I've turned down projects where a simple SQL query would do the job. You get <strong>honest technical guidance</strong>, not sales pitches.
			</p>

			<p>
				Some consultants talk about "best practices." I show you my production monitoring dashboard. Some consultants guess at costs. I show you my Supabase invoice. Some consultants recommend what's trending on Hacker News. I recommend what's running in my infrastructure without breaking.
			</p>
		</div>

		<!-- Timeline -->
		<div class="mb-16">
			<h2 class="text-3xl font-display font-bold text-text-primary mb-8">The Journey</h2>
			<div class="space-y-6">
				<Card class="p-6">
					<div class="flex items-start gap-4">
						<div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
							<span class="text-brand-primary font-bold">2016</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-text-primary mb-2">Started Coding</h3>
							<p class="text-text-secondary">
								First Python script to automate data collection for thesis. Realized I enjoyed building more than designing mechanical systems.
							</p>
						</div>
					</div>
				</Card>

				<Card class="p-6">
					<div class="flex items-start gap-4">
						<div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
							<span class="text-brand-primary font-bold">2018</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-text-primary mb-2">First Production System</h3>
							<p class="text-text-secondary">
								Built web scraping + data pipeline for e-commerce analytics. Processed 100K+ products daily. Learned about error handling the hard way.
							</p>
						</div>
					</div>
				</Card>

				<Card class="p-6">
					<div class="flex items-start gap-4">
						<div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
							<span class="text-brand-primary font-bold">2020</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-text-primary mb-2">Deep Dive into AI/ML</h3>
							<p class="text-text-secondary">
								Started building computer vision systems. First project: retail security monitoring with YOLO. 50+ camera streams. Nigeria's infrastructure forced me to master edge computing.
							</p>
						</div>
					</div>
				</Card>

				<Card class="p-6">
					<div class="flex items-start gap-4">
						<div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
							<span class="text-brand-primary font-bold">2023</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-text-primary mb-2">LLM Production Systems</h3>
							<p class="text-text-secondary">
								Built semantic search for 1M+ legal documents. Optimized GPT-4 costs from $60K/month to $4.8K. Realized cost architecture matters more than prompt engineering.
							</p>
						</div>
					</div>
				</Card>

				<Card class="p-6">
					<div class="flex items-start gap-4">
						<div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
							<span class="text-brand-primary font-bold">2024</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-text-primary mb-2">Launch GrindProof + Consulting</h3>
							<p class="text-text-secondary">
								Started GrindProof (AI accountability SaaS) as my architecture lab. Began consulting to help companies avoid the mistakes I've already made.
							</p>
						</div>
					</div>
				</Card>
			</div>
		</div>

		<!-- Current Focus -->
		<div class="mb-16">
			<h2 class="text-3xl font-display font-bold text-text-primary mb-6">What I'm Doing Now</h2>
			<div class="grid md:grid-cols-2 gap-6">
				<Card class="p-6">
					<h3 class="text-xl font-semibold text-text-primary mb-3">Building in Public</h3>
					<p class="text-text-secondary mb-4">
						Running GrindProof with real users, testing every architecture pattern before recommending it to clients. Current focus: Claude API optimization and Supabase Realtime at scale.
					</p>
					<a href="/case-studies/grindproof" class="text-brand-primary hover:text-brand-secondary transition-colors">
						See the lab →
					</a>
				</Card>

				<Card class="p-6">
					<h3 class="text-xl font-semibold text-text-primary mb-3">Client Work</h3>
					<p class="text-text-secondary mb-4">
						Helping 2-3 clients at a time with AI cost optimization, production system architecture, and technical leadership. Short engagements (3-8 weeks), focused outcomes.
					</p>
					<a href="/case-studies" class="text-brand-primary hover:text-brand-secondary transition-colors">
						See case studies →
					</a>
				</Card>
			</div>
		</div>

		<!-- CTA -->
		<div class="text-center p-8 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-lg border border-brand-primary/20">
			<h3 class="text-2xl font-display font-bold text-text-primary mb-4">
				Let's Work Together
			</h3>
			<p class="text-text-secondary mb-6 max-w-2xl mx-auto">
				Whether you need a quick audit, architecture review, or ongoing technical leadership - I'm here to help. Start with a free 15-minute consultation.
			</p>
			<div class="flex flex-wrap gap-4 justify-center">
				<a
					href="https://cal.com/codefred/consultation"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
				>
					Book Free Call
				</a>
				<a
					href="mailto:{personalData.email}"
					class="px-6 py-3 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all"
				>
					Send Email
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.prose h2 {
		color: var(--brand-primary);
		font-family: var(--font-display);
		font-size: 1.875rem;
		font-weight: 700;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}

	.prose p {
		margin-bottom: 1.25rem;
		line-height: 1.75;
	}

	.prose strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	.prose a {
		color: var(--brand-primary);
		text-decoration: none;
		border-bottom: 1px solid var(--brand-primary);
		transition: color 0.2s;
	}

	.prose a:hover {
		color: var(--brand-secondary);
		border-bottom-color: var(--brand-secondary);
	}

	.prose ul,
	.prose ol {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}

	.prose li {
		margin-bottom: 0.5rem;
	}
</style>
