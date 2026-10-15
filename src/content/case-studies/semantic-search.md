---
slug: semantic-search
title: Hybrid semantic search over 1M+ legal documents with sub-100ms p99 latency
summary: Embeddings, Qdrant and keyword fusion helped lawyers find case law by meaning, not exact wording.
area: agents
client: Legal tech startup
role: Senior backend engineer
timeline: 6 weeks
order: 4
published: true
result:
  before: 18 min
  after: 6 min
  label: to find a case
problem: Keyword search missed cases that used different wording for the same idea, and returned thousands of irrelevant results for common terms.
approach: A fine-tuned sentence-transformer, section-aware chunking into about 8 million vectors in self-hosted Qdrant, and reciprocal rank fusion with Elasticsearch, re-ranked by a cross-encoder.
outcome: Relevant results in the top 10 rose from 4.2 to 8.7, p99 latency held under 100ms, and the time lawyers needed to find a case fell from 18 minutes to 6.
stack: [Python, FastAPI, Qdrant, Sentence Transformers, Elasticsearch, PostgreSQL, Redis]
---

A legal tech startup needed lawyers to find relevant case law across more than a million court documents. Keyword search was failing: legal language is complex, and lawyers rarely remember the exact phrases in the cases they need.

## The problem

- Searching "vehicular homicide" missed cases that said "death by dangerous driving".
- "Breach of contract" returned thousands of irrelevant results.
- There was no way to search by concept, such as "cases where the defendant claimed duress".

Lawyers spent hours filtering results, or missed precedents entirely.

## The approach

### Picking the embedding model

General-purpose models were either expensive at this scale or weak on legal vocabulary, and the legal-domain model was too slow. A fine-tuned `all-mpnet-base-v2`, trained on 50,000 legal document pairs, gave the best balance, ran on CPU, and improved recall by 40% over the base model.

### Chunking

Documents are split on section headings rather than character counts, into chunks of about 512 tokens with a 50-token overlap. Each chunk keeps its document, page and section. That came to roughly 8 million chunks.

### Vector database

After testing Pinecone, Weaviate, Milvus and Qdrant, we chose Qdrant: it could be self-hosted (a data-privacy requirement), filters quickly on metadata such as jurisdiction and date, and its HNSW index kept queries under 100ms.

### Hybrid retrieval

Vector search catches meaning; keyword search guarantees exact citations aren't missed. Results from both are combined with reciprocal rank fusion, and the top 20 are re-ranked with a cross-encoder.

```python
async def hybrid_search(query: str, filters: dict):
    vector = model.encode(query)
    semantic = await qdrant.search("legal_docs", query_vector=vector, limit=100, filter=filters)
    keyword = await elasticsearch.search(index="legal_docs", query=query, size=100)

    combined = reciprocal_rank_fusion(semantic, keyword)
    return (await rerank(combined[:20], query))[:10]
```

### Production tuning

- **Latency spikes.** p50 was 30ms but p99 was 800ms. Index warming, a Redis query cache and connection pooling brought p99 under 100ms.
- **Indexing time.** Batched embedding, eight parallel workers and bulk uploads cut a full re-index from 40 hours to 4.
- **Storage.** Scalar quantisation shrank the index from 12GB to 3GB for under 2% accuracy loss.

## The outcome

Launched to 500 lawyers in beta, then rolled out fully.

| | Keyword | Hybrid |
| --- | --- | --- |
| Relevant results in top 10 | 4.2 | 8.7 |
| Query latency (p99) | 120ms | 95ms |
| Time to find a case | 18 min | 6 min |
| User satisfaction | 52% | 89% |

## What carries over

Fine-tuning on domain data beat switching to a "better" general model, and hybrid search beat either method alone.
