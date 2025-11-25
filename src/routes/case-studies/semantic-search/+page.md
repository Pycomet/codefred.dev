---
layout: caseStudy
title: "Building Semantic Search for 1M+ Documents"
client: "Legal Tech Startup"
role: "Senior Backend Engineer"
timeline: "6 Weeks"
stack: "Python, FastAPI, Qdrant, Sentence Transformers, PostgreSQL"
date: "2024"
featured: true
---

# Building Semantic Search for 1M+ Documents

**Client:** Legal Tech Startup
**Role:** Senior Backend Engineer
**Timeline:** 6 Weeks
**Stack:** Python, FastAPI, Qdrant, Sentence Transformers, PostgreSQL

## The Challenge

A legal tech startup needed to help lawyers find relevant case law from over 1 million court documents. Traditional keyword search was failing - legal language is complex, and lawyers often can't remember exact phrases from cases they need.

<div class="metrics">
<div class="metric">
<div class="metric-value">1M+</div>
<div class="metric-label">Documents Indexed</div>
</div>
<div class="metric">
<div class="metric-value">&lt;100ms</div>
<div class="metric-label">P99 Latency</div>
</div>
<div class="metric">
<div class="metric-value">3x</div>
<div class="metric-label">Better Recall</div>
</div>
</div>

**The Result:** Implemented a production-grade semantic search system using vector embeddings, achieving &lt;100ms p99 latency and 3x better recall than keyword search.

## The Problem: Keywords Don't Understand Context

The existing system used Elasticsearch with keyword matching. It worked like Google circa 1998.

**The Failures:**
- Search "vehicular homicide" → Miss cases that say "death by dangerous driving"
- Search "breach of contract" → Get thousands of irrelevant results
- Can't search by concept: "cases where defendant claimed duress"
- No understanding of legal synonyms or related concepts

Lawyers were spending hours manually filtering results or missing critical precedents entirely.

## The Solution: Semantic Embeddings + Hybrid Search

We replaced keyword-only search with a hybrid system that understands meaning.

### Phase 1: Choosing the Right Embedding Model

Not all embedding models are equal, especially for legal documents.

**Models Tested:**
- `text-embedding-3-small` (OpenAI) - Good general purpose, but expensive at scale
- `all-MiniLM-L6-v2` - Fast but poor on legal jargon
- `legal-bert-base-uncased` - Domain-specific, but slow
- **Winner:** Fine-tuned `sentence-transformers/all-mpnet-base-v2` on legal corpus

**Why It Won:**
- Good balance of speed (50ms per document) and accuracy
- Fine-tuning on 50K legal document pairs improved recall by 40%
- 384 dimensions (smaller vector = faster search)
- Can run on CPU in production

### Phase 2: Chunking Strategy

1 million documents × average 50 pages = death by memory overflow.

**The Strategy:**
1. **Split documents logically:** By section headings, not arbitrary character counts
2. **Chunk size:** 512 tokens (~400 words) - sweet spot for legal reasoning
3. **Overlap:** 50-token overlap between chunks to avoid context loss
4. **Metadata preservation:** Each chunk knows its parent document, page number, section

**Total chunks:** ~8 million (from 1M documents)

### Phase 3: Vector Database Selection

Tested Pinecone, Weaviate, Milvus, and Qdrant.

**Chose Qdrant because:**
- Self-hosted (client requirement for data privacy)
- Fast filtering on metadata (critical for legal search)
- HNSW index for sub-100ms queries
- Handles 8M vectors without breaking a sweat
- Rust-based (stupid fast)

### Phase 4: Hybrid Search Architecture

Vector search alone isn't enough. We combined it with traditional search for best results.

**The Pipeline:**
```python
async def hybrid_search(query: str, filters: dict):
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

    return final_results[:10]
```

**Why This Works:**
- Vector search catches semantic matches ("vehicular homicide" = "death by dangerous driving")
- Keyword search ensures exact citations aren't missed
- Re-ranking with cross-encoder improves precision

## Performance Optimization

Getting from "it works" to "it works in production" required optimization.

### Challenge 1: Latency Spikes

**Problem:** P50 was 30ms, but P99 was 800ms (unacceptable for user experience)

**The Fix:**
1. **Index warming:** Pre-load frequently accessed vectors into memory
2. **Query caching:** Redis cache for common searches (30% hit rate)
3. **Connection pooling:** Reuse connections to Qdrant
4. **Result:** P99 down to &lt;100ms

### Challenge 2: Indexing Speed

**Problem:** Initial indexing of 1M documents took 40 hours

**The Fix:**
1. **Batch embedding:** Process 256 documents at once (GPU batching)
2. **Async workers:** 8 parallel workers generating embeddings
3. **Bulk upload:** Upload to Qdrant in batches of 1000
4. **Result:** Indexing reduced to 4 hours

### Challenge 3: Storage Costs

**Problem:** 8M vectors × 384 dimensions × 4 bytes = 12GB just for vectors

**The Fix:**
1. **Quantization:** Scalar quantization reduced storage by 4x with &lt;2% accuracy loss
2. **Result:** 3GB total, fits in memory

## Multilingual Support

Legal system operates in 3 official languages (English, French, Yoruba).

**The Approach:**
- Used `paraphrase-multilingual-mpnet-base-v2` model
- Shared vector space across languages (English query finds French documents)
- Language detection at query time
- No separate indexes needed

## The Outcome

Launched to 500 lawyers in beta, then full rollout.

| Metric | Keyword Search | Semantic Search |
|--------|---------------|-----------------|
| Relevant Results in Top 10 | 4.2 | 8.7 |
| Query Latency (P99) | 120ms | 95ms |
| User Satisfaction | 52% | 89% |
| Time to Find Case | 18 min | 6 min |

**Business Impact:**
- 3x increase in platform usage
- 67% reduction in support tickets about "can't find case"
- Became primary competitive differentiator in sales

> "This isn't just better search - it's like having a junior associate who's read every case in the database."
> — Product Lead

## The Lesson

Semantic search is table stakes for any document-heavy application in 2024. But production deployment isn't just `pip install sentence-transformers`.

**What I Learned:**
- **Domain-specific matters:** Fine-tuning on legal data improved results more than switching to a "better" general model
- **Hybrid > Pure:** Combining semantic + keyword search beats either alone
- **Latency is a feature:** Users will tolerate 5% less accuracy for 5x faster results
- **Quantization is free money:** 4x storage reduction with negligible accuracy loss

If you're still using only keyword search for documents, you're leaving money on the table.
