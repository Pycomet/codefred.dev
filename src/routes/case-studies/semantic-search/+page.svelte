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
	title="Semantic Search Case Study | 1M+ Documents | Codefred"
	description="Built production-grade semantic search for 1M+ legal documents with <100ms p99 latency using vector embeddings and hybrid search architecture."
	canonical="https://codefred.dev/case-studies/semantic-search"
/>

<CaseStudyHero
	title="Building Semantic Search for 1M+ Documents"
	client="Legal Tech Startup"
	role="Senior Backend Engineer"
	timeline="6 Weeks"
	stack={['Python', 'FastAPI', 'Qdrant', 'Sentence Transformers', 'PostgreSQL', 'Elasticsearch']}
/>

<div class="container-custom max-w-5xl py-12">
	<ContentSection title="The Challenge">
		<p>
			A legal tech startup needed to help lawyers find relevant case law from over 1 million court documents. Traditional keyword search was failing - legal language is complex, and lawyers often can't remember exact phrases from cases they need.
		</p>
	</ContentSection>

	<MetricsGrid
		metrics={[
			{ value: '1M+', label: 'Documents Indexed', highlight: true },
			{ value: '<100ms', label: 'P99 Latency', highlight: true },
			{ value: '3x', label: 'Better Recall', highlight: true }
		]}
	/>

	<ContentSection>
		<p class="text-lg text-text-primary font-semibold">
			Implemented a production-grade semantic search system using vector embeddings, achieving &lt;100ms p99 latency and 3x better recall than keyword search.
		</p>
	</ContentSection>

	<ContentSection title="The Problem: Keywords Don't Understand Context">
		<p>
			The existing system used Elasticsearch with keyword matching. It worked like Google circa 1998.
		</p>

		<CalloutBox type="warning" title="The Failures">
			<ul>
				<li>Search "vehicular homicide" → Miss cases that say "death by dangerous driving"</li>
				<li>Search "breach of contract" → Get thousands of irrelevant results</li>
				<li>Can't search by concept: "cases where defendant claimed duress"</li>
				<li>No understanding of legal synonyms or related concepts</li>
			</ul>
		</CalloutBox>

		<p>
			Lawyers were spending hours manually filtering results or missing critical precedents entirely.
		</p>
	</ContentSection>

	<ContentSection title="The Solution: Semantic Embeddings + Hybrid Search" variant="highlight">
		<p>
			We replaced keyword-only search with a hybrid system that understands meaning.
		</p>

		<h3>Phase 1: Choosing the Right Embedding Model</h3>
		<p>
			Not all embedding models are equal, especially for legal documents.
		</p>

		<div class="my-6 bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
			<h4 class="font-semibold text-text-primary mb-4">Models Tested:</h4>
			<div class="space-y-3 text-sm">
				<div class="flex items-start gap-3">
					<span class="text-text-muted">❌</span>
					<div>
						<strong class="text-text-primary">text-embedding-3-small (OpenAI)</strong>
						<p class="text-text-secondary">Good general purpose, but expensive at scale</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<span class="text-text-muted">❌</span>
					<div>
						<strong class="text-text-primary">all-MiniLM-L6-v2</strong>
						<p class="text-text-secondary">Fast but poor on legal jargon</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<span class="text-text-muted">❌</span>
					<div>
						<strong class="text-text-primary">legal-bert-base-uncased</strong>
						<p class="text-text-secondary">Domain-specific, but slow</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<span class="text-brand-primary">✅</span>
					<div>
						<strong class="text-brand-primary">Fine-tuned all-mpnet-base-v2</strong>
						<p class="text-text-secondary">Winner: Good balance of speed (50ms per document) and accuracy</p>
					</div>
				</div>
			</div>
		</div>

		<CalloutBox type="success" title="Why It Won">
			<ul>
				<li>Good balance of speed (50ms per document) and accuracy</li>
				<li>Fine-tuning on 50K legal document pairs improved recall by 40%</li>
				<li>384 dimensions (smaller vector = faster search)</li>
				<li>Can run on CPU in production</li>
			</ul>
		</CalloutBox>

		<h3>Phase 2: Chunking Strategy</h3>
		<p>
			1 million documents × average 50 pages = death by memory overflow.
		</p>

		<CalloutBox type="info" title="The Strategy">
			<ol>
				<li><strong>Split documents logically:</strong> By section headings, not arbitrary character counts</li>
				<li><strong>Chunk size:</strong> 512 tokens (~400 words) - sweet spot for legal reasoning</li>
				<li><strong>Overlap:</strong> 50-token overlap between chunks to avoid context loss</li>
				<li><strong>Metadata preservation:</strong> Each chunk knows its parent document, page number, section</li>
			</ol>
			<p class="mt-3 font-semibold text-brand-primary">Total chunks: ~8 million (from 1M documents)</p>
		</CalloutBox>

		<h3>Phase 3: Vector Database Selection</h3>
		<p>
			Tested Pinecone, Weaviate, Milvus, and Qdrant.
		</p>

		<CalloutBox type="success" title="Chose Qdrant because">
			<ul>
				<li>Self-hosted (client requirement for data privacy)</li>
				<li>Fast filtering on metadata (critical for legal search)</li>
				<li>HNSW index for sub-100ms queries</li>
				<li>Handles 8M vectors without breaking a sweat</li>
				<li>Rust-based (stupid fast)</li>
			</ul>
		</CalloutBox>

		<h3>Phase 4: Hybrid Search Architecture</h3>
		<p>
			Vector search alone isn't enough. We combined it with traditional search for best results.
		</p>
	</ContentSection>

	<CodeBlock
		language="python"
		title="Hybrid Search Pipeline"
		code={`async def hybrid_search(query: str, filters: dict):
    # 1. Generate query embedding
    query_embedding = model.encode(query)

    # 2. Vector search (semantic similarity)
    semantic_results = await qdrant.search(
        collection="legal_docs",
        query_vector=query_embedding,
        limit=100,
        filter=filters  # jurisdiction, date range, etc.
    )

    # 3. Keyword search (for exact matches)
    keyword_results = await elasticsearch.search(
        index="legal_docs",
        query=query,
        size=100
    )

    # 4. Reciprocal Rank Fusion (combine results)
    combined = rank_fusion(semantic_results, keyword_results)

    # 5. Re-rank top 20 with cross-encoder
    final_results = await rerank(combined[:20], query)

    return final_results[:10]`}
	/>

	<ContentSection>
		<CalloutBox type="tip" title="Why This Works">
			<ul>
				<li>Vector search catches semantic matches ("vehicular homicide" = "death by dangerous driving")</li>
				<li>Keyword search ensures exact citations aren't missed</li>
				<li>Re-ranking with cross-encoder improves precision</li>
			</ul>
		</CalloutBox>
	</ContentSection>

	<ContentSection title="Performance Optimization">
		<p>
			Getting from "it works" to "it works in production" required optimization.
		</p>

		<div class="grid md:grid-cols-3 gap-6 my-6">
			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">Challenge 1: Latency Spikes</h4>
				<p class="text-sm text-text-secondary mb-3">P50 was 30ms, but P99 was 800ms</p>
				<ul class="space-y-2 text-sm">
					<li>Index warming</li>
					<li>Query caching (Redis)</li>
					<li>Connection pooling</li>
				</ul>
				<p class="text-brand-primary font-semibold text-sm mt-3">Result: P99 &lt; 100ms</p>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">Challenge 2: Indexing Speed</h4>
				<p class="text-sm text-text-secondary mb-3">Initial indexing took 40 hours</p>
				<ul class="space-y-2 text-sm">
					<li>Batch embedding (256 docs)</li>
					<li>8 parallel workers</li>
					<li>Bulk upload (1000 batches)</li>
				</ul>
				<p class="text-brand-primary font-semibold text-sm mt-3">Result: 4 hours</p>
			</div>

			<div class="bg-bg-secondary rounded-lg p-6 border border-brand-primary/20">
				<h4 class="text-brand-primary font-semibold mb-3">Challenge 3: Storage Costs</h4>
				<p class="text-sm text-text-secondary mb-3">8M vectors = 12GB</p>
				<ul class="space-y-2 text-sm">
					<li>Scalar quantization</li>
					<li>4x storage reduction</li>
					<li>&lt;2% accuracy loss</li>
				</ul>
				<p class="text-brand-primary font-semibold text-sm mt-3">Result: 3GB total</p>
			</div>
		</div>
	</ContentSection>

	<ContentSection title="The Outcome">
		<p>
			Launched to 500 lawyers in beta, then full rollout.
		</p>
	</ContentSection>

	<ComparisonTable
		title="Keyword vs Semantic Search"
		rows={[
			{ metric: 'Relevant Results in Top 10', before: '4.2', after: '8.7' },
			{ metric: 'Query Latency (P99)', before: '120ms', after: '95ms' },
			{ metric: 'User Satisfaction', before: '52%', after: '89%' },
			{ metric: 'Time to Find Case', before: '18 min', after: '6 min' }
		]}
	/>

	<CalloutBox type="success" title="Business Impact">
		<ul>
			<li>3x increase in platform usage</li>
			<li>67% reduction in support tickets about "can't find case"</li>
			<li>Became primary competitive differentiator in sales</li>
		</ul>
	</CalloutBox>

	<Testimonial
		quote="This isn't just better search - it's like having a junior associate who's read every case in the database."
		author="Product Lead"
	/>

	<ContentSection title="The Lesson" variant="dark">
		<p>
			Semantic search is table stakes for any document-heavy application in 2024. But production deployment isn't just <code>pip install sentence-transformers</code>.
		</p>

		<CalloutBox type="tip" title="What I Learned">
			<ul>
				<li><strong>Domain-specific matters:</strong> Fine-tuning on legal data improved results more than switching to a "better" general model</li>
				<li><strong>Hybrid > Pure:</strong> Combining semantic + keyword search beats either alone</li>
				<li><strong>Latency is a feature:</strong> Users will tolerate 5% less accuracy for 5x faster results</li>
				<li><strong>Quantization is free money:</strong> 4x storage reduction with negligible accuracy loss</li>
			</ul>
		</CalloutBox>

		<p class="text-lg text-text-primary font-semibold mt-6">
			If you're still using only keyword search for documents, you're leaving money on the table.
		</p>
	</ContentSection>

	<CaseStudyCTA />
</div>
