---
slug: cost-reduction
title: How I cut a FinTech's OpenAI bill by 92% without slowing it down
summary: Semantic caching and model routing took a Series B FinTech from $60k to $4.8k a month in OpenAI spend.
area: ai-cost
client: Series B FinTech SaaS
role: Technical consultant
timeline: 3 weeks
order: 2
featured: 1
published: true
result:
  before: $60k/mo
  after: $4.8k/mo
  label: OpenAI spend
problem: Every request, from "hello" to data extraction, went to GPT-4. Identical questions were paid for twice, and costs grew faster than users.
approach: A semantic cache in front of the API, a small classifier that routes each request to the cheapest model that can handle it, and structured outputs to cut wasted tokens.
outcome: Monthly spend fell from $60,000 to $4,800. Average latency dropped from 2.4s to 0.8s because cached and smaller-model answers return faster.
stack: [Python, FastAPI, Redis, OpenAI, Hugging Face, vLLM]
---

A high-growth FinTech startup was burning $60,000 a month on OpenAI. Their product, an intelligent document processor, sent every single user interaction to GPT-4. Their user base had doubled in a quarter, and infrastructure costs had quadrupled. They were losing money on every active user.

## What I found

I spent the first 48 hours in their access logs and prompt code. The issue wasn't prompt engineering. It was architecture.

- **One model for everything.** Simple "hello" messages and "extract the date from this text" tasks went to `gpt-4-32k`.
- **No memory.** If two users asked the same question five minutes apart, they paid for the answer twice.
- **A thin wrapper.** The backend passed requests straight through to the API, with no handling for load or cost.

## What I built

We didn't rewrite their product. We put a traffic controller in front of it.

### 1. Semantic caching

Before a request touches an LLM, it should check whether we've answered it before. String matching doesn't work for this ("What's the date?" and "Tell me today's date" are the same question), so queries are embedded with a cheap model and compared against a Redis vector store.

About 35% of traffic was answered straight from the cache, in under 20ms, at no extra cost because Redis was already in their stack.

### 2. Model routing

Most tasks don't need the most capable model. A fine-tuned DistilBERT classifier, running locally, scores each prompt's complexity and routes it:

- **Simple and formatting tasks** go to a self-hosted Mistral-7B on vLLM.
- **Moderate reasoning** goes to a cheaper hosted model.
- **The hardest few percent** still go to GPT-4.

### 3. Structured outputs

They were paying for chatty prose when they needed JSON. Forcing structured outputs and tightening token limits cut the average response length by 40%.

```python
async def route_request(user_query: str):
    # 1. Answered before? Return it.
    cached = await vector_db.search(user_query, threshold=0.92)
    if cached:
        return cached

    # 2. Score complexity with a small local model
    score = await classifier.predict(user_query)

    # 3. Send it to the cheapest model that can handle it
    if score < 0.3:
        response = await local_llm.generate(user_query)
    elif score < 0.7:
        response = await mid_tier.generate(user_query)
    else:
        response = await gpt4.generate(user_query)

    # 4. Cache the answer without blocking the reply
    background_tasks.add_task(vector_db.save, user_query, response)
    return response
```

## The numbers

| | Before | After |
| --- | --- | --- |
| Monthly OpenAI spend | $60,000 | $4,800 |
| Average latency | 2.4s | 0.8s |
| Uptime | 99.1% | 99.9% |

## What carries over

If your AI bill is growing faster than your users, you usually don't need better prompts. You need a cache, a router, and a reason for every call to the biggest model.
