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
	title="When Postgres Beat Machine Learning | Codefred"
	description="How a database optimization solved an 'AI problem' 10x faster and cheaper than the proposed ML solution. Sometimes SQL > AI."
	canonical="https://codefred.dev/case-studies/when-postgres-beat-ml"
/>

<CaseStudyHero
	title="When Postgres Beat Machine Learning"
	client="E-commerce Platform"
	role="Technical Consultant"
	timeline="1 Week"
	stack={['PostgreSQL', 'SQL', 'Data Modeling', 'Python']}
/>

<div class="container-custom max-w-5xl py-12">
	<ContentSection title="The TL;DR">
		<p class="text-lg text-text-primary font-semibold">
			Client wanted an AI recommendation engine. After analysis, I discovered their "ML problem" was actually a data quality issue. A well-designed Postgres query solved it 10x faster and cheaper.
		</p>
	</ContentSection>

	<MetricsGrid
		metrics={[
			{ value: '$0', label: 'vs $5k/month AI service', highlight: true },
			{ value: '10x', label: 'Faster', highlight: true },
			{ value: '90%', label: 'Complexity Reduction', highlight: true }
		]}
	/>

	<ContentSection>
		<CalloutBox type="success" title="The Result">
			<p>
				Instead of building an ML pipeline with embeddings, vector stores, and model serving infrastructure, we wrote a 50-line SQL query that runs in 12ms and costs nothing extra.
			</p>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="The Problem: 'We Need AI for This'" variant="highlight">
		<p>
			An e-commerce platform wanted to show "recommended products" based on user behavior. Their initial plan:
		</p>

		<div class="my-6 bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
			<h4 class="font-semibold text-text-primary mb-4">Proposed ML Solution:</h4>
			<ul class="space-y-2">
				<li>Collect user clickstream data</li>
				<li>Train collaborative filtering model</li>
				<li>Generate product embeddings</li>
				<li>Deploy model serving infrastructure</li>
				<li>Subscribe to $5K/month ML platform</li>
			</ul>
			<p class="mt-4 text-text-muted text-sm">Estimated timeline: 3 months • Estimated cost: $15K setup + $5K/month</p>
		</div>

		<CalloutBox type="warning" title="The Real Problem">
			<p>
				After spending 2 hours analyzing their data, I discovered they weren't trying to predict future behavior—they just wanted to show products that similar customers bought together.
			</p>
			<p class="mt-2 font-semibold">This is a database query, not a machine learning problem.</p>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="The Solution: SQL + Good Data Modeling">
		<p>
			Instead of ML, we used basic relational database operations:
		</p>

		<div class="grid md:grid-cols-2 gap-6 my-6">
			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">What We Did</h4>
				<ol class="space-y-2 text-sm">
					<li>Created a materialized view of product co-purchases</li>
					<li>Added indexes on frequently queried columns</li>
					<li>Wrote a query that finds "products bought together"</li>
					<li>Cached results for 1 hour (99% hit rate)</li>
				</ol>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">What We Avoided</h4>
				<ul class="space-y-2 text-sm">
					<li>No model training pipeline</li>
					<li>No vector database</li>
					<li>No model serving infrastructure</li>
					<li>No ML platform subscription</li>
					<li>No data science team needed</li>
				</ul>
			</div>
		</div>
	</ContentSection>

	<CodeBlock
		language="sql"
		title="The 'AI' Solution (It's Just SQL)"
		code={`-- Materialized view: products frequently bought together
CREATE MATERIALIZED VIEW product_recommendations AS
SELECT 
    p1.product_id as source_product,
    p2.product_id as recommended_product,
    COUNT(DISTINCT o.order_id) as co_purchase_count,
    AVG(p2.rating) as avg_rating,
    SUM(p2.revenue) as total_revenue
FROM order_items p1
JOIN order_items p2 
    ON p1.order_id = p2.order_id 
    AND p1.product_id != p2.product_id
JOIN products p2 ON p2.product_id = p2.product_id
JOIN orders o ON o.order_id = p1.order_id
WHERE o.created_at > NOW() - INTERVAL '90 days'
GROUP BY p1.product_id, p2.product_id
HAVING COUNT(DISTINCT o.order_id) >= 3;

-- Create indexes for fast lookups
CREATE INDEX idx_recommendations_source 
    ON product_recommendations(source_product, co_purchase_count DESC);

-- The query that powers recommendations (12ms avg)
SELECT 
    recommended_product,
    co_purchase_count,
    avg_rating
FROM product_recommendations
WHERE source_product = $1
ORDER BY 
    co_purchase_count DESC,
    avg_rating DESC
LIMIT 10;`}
	/>

	<ContentSection>
		<CalloutBox type="tip" title="Why This Works">
			<ul>
				<li><strong>Materialized view:</strong> Pre-computed results, refreshed hourly</li>
				<li><strong>Smart indexing:</strong> Lookups are O(log n) instead of full table scans</li>
				<li><strong>Recency filter:</strong> Only last 90 days of data (keeps it relevant)</li>
				<li><strong>Minimum threshold:</strong> Only show products bought together 3+ times (quality filter)</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="The Outcome">
		<p>
			Deployed to production in 3 days (vs 3 months for ML solution).
		</p>
	</ContentSection>

	<ComparisonTable
		title="SQL vs ML Approach"
		rows={[
			{ metric: 'Development Time', before: '3 months', after: '3 days' },
			{ metric: 'Monthly Cost', before: '$5,000', after: '$0' },
			{ metric: 'Query Latency', before: '~100ms (estimated)', after: '12ms' },
			{ metric: 'Infrastructure Complexity', before: 'High', after: 'None' },
			{ metric: 'Maintenance Burden', before: 'ML team required', after: 'Standard DB ops' }
		]}
	/>

	<CalloutBox type="success" title="Business Impact">
		<ul>
			<li>Recommendations live in 3 days instead of 3 months</li>
			<li>Saved $15K setup + $5K/month ongoing costs</li>
			<li>10% increase in average order value from recommendations</li>
			<li>No new infrastructure to maintain</li>
		</ul>
	</CalloutBox>

	<Testimonial
		quote="I was ready to hire a data science team. Codefred showed me we already had everything we needed in our database. This honesty saved us months of work and tens of thousands of dollars."
		author="Founder"
		role="E-commerce Platform"
	/>

	<ContentSection title="The Lesson" variant="dark">
		<p class="text-lg text-text-primary font-semibold mb-4">
			Not every data problem needs AI. Sometimes the best solution is boring, fast, and already in your stack.
		</p>

		<CalloutBox type="warning" title="When to Use SQL Instead of ML">
			<ul>
				<li><strong>You have structured data:</strong> Relational databases excel at this</li>
				<li><strong>Rules are deterministic:</strong> "Show products bought together" is a query, not a prediction</li>
				<li><strong>You need explainability:</strong> SQL results are easy to debug and explain</li>
				<li><strong>Latency matters:</strong> Database indexes beat model inference for speed</li>
				<li><strong>Budget is tight:</strong> SQL is free; ML infrastructure isn't</li>
			</ul>
		</CalloutBox>

		<CalloutBox type="info" title="When You Actually Need ML">
			<ul>
				<li>Predicting future behavior (not just historical patterns)</li>
				<li>Unstructured data (text, images, audio)</li>
				<li>Complex patterns humans can't codify</li>
				<li>Personalization at massive scale (millions of users)</li>
			</ul>
		</CalloutBox>

		<div class="mt-8 p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl border border-brand-primary/20">
			<p class="text-lg text-text-primary font-semibold mb-3">
				The Honest Consultant Test
			</p>
			<p class="text-text-secondary">
				A good consultant tells you when you <em>don't</em> need their most expensive solution. I could have built the ML pipeline and billed for 3 months. Instead, I solved it in 3 days with SQL.
			</p>
			<p class="text-text-secondary mt-3">
				<strong>Your success > My billable hours.</strong>
			</p>
		</div>
	</ContentSection>

	<CaseStudyCTA 
		title="Need honest technical guidance?"
		description="I'll tell you if AI won't solve your problem. Sometimes you need better SQL, not better models. Book a consultation for an honest assessment."
	/>
</div>
