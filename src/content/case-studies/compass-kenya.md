---
slug: compass-kenya
title: Making an LLM career agent shorter, cheaper and bilingual for Kenyan job seekers
summary: An evaluation harness first, then persona-aware flows, Swahili support and CV integration for Tabiya's Compass.
area: agents
client: Tabiya (Compass Kenya)
role: Full-stack AI developer
timeline: 6 months, 5 milestones
order: 1
featured: 3
published: true
result:
  before: 70 turns
  after: ≤35 turns
  label: worst-case conversation
problem: The multi-agent interview flow averaged 32 turns, repeated questions users had answered, spent most of its compute after the conversation ended, and only spoke English.
approach: Built baselines, golden transcripts and CI quality gates first. Then used them to ship persona detection, Swahili and Sheng support mapped to the ESCO taxonomy, and CV pre-population.
outcome: Worst-case conversations halved, LLM calls fell 20%, and Swahili runs at over 80% parity with English, with skill-discovery quality held at 85%+ of baseline. Rated 5.0 on all five Upwork milestones.
stack: [Python, FastAPI, TypeScript, React, Gemini 2.5 Flash, MongoDB, GCP, Pulumi]
---

[Compass](https://compass.tabiya.org) is an AI career-guidance platform by Tabiya. It interviews job seekers about their work history and maps what they've done to a formal skills taxonomy, including invisible work like informal trading, caregiving and community roles.

For the Kenya launch, the multi-agent pipeline had a problem: conversations were long, repetitive and English-only. In a market where many users pay per megabyte and speak Swahili first, every unnecessary turn was a user lost.

## What I found

The core flow is a chain of LLM agents (welcome, collect experiences, explore skills, farewell). It worked, but nobody could say how well. My first deliverable was measurement, not fixes. Instrumenting the end-to-end suite and running repeated conversations per persona showed:

- **32.4 turns per conversation on average**, and 70 in the worst case (a formal worker giving long, CV-style answers)
- **251 LLM calls per conversation**, driving both cost and latency
- **An 11% question repetition rate**: the agent re-asked things users had already answered
- **A hidden bug**: the farewell agent used 83% of processing time, making 64 LLM calls after the conversation had ended
- **English only**, with no path for users more comfortable in Swahili or who switch between the two

The ask: 20% faster conversations, 30% less repetition and Swahili support, without degrading the skills discovered. That last constraint is what makes it hard.

## What I built

You can't refactor prompts safely without a regression net, so the net came first.

### 1. Baselines and CI quality gates

A metrics collector hooked into the end-to-end chat executor records turns, per-agent timing, LLM calls, repetition and skill overlap. Golden transcripts per persona run in GitHub Actions, and a PR fails if any of those regress past a threshold. Structured logging with correlation IDs, and a checklist that keeps personal data out of the logs.

### 2. Persona-aware conversations

The data showed two very different users. An informal worker ("I sell vegetables at the market") needs scaffolding and examples. A formal worker reciting their CV needs the agent to acknowledge what it heard and stop re-asking. A bilingual persona detector adapts prompts, probing depth and exit criteria. Together with the farewell fix, this took the worst case from 70 turns to 35 or fewer.

### 3. Swahili enablement

- Evaluated models for Swahili quality and cost, and standardised on Gemini 2.5 Flash
- A synonym map of 50+ Swahili and Sheng job terms normalised to the ESCO taxonomy before retrieval
- Handling for code-switching, since real users mix English and Swahili mid-sentence
- Swahili golden transcripts in the same CI gates

### 4. CV integration

Uploaded CVs used to be dead-end text. A structured extractor now pre-populates the agent with deduplicated experiences, so it opens with "I see you worked as X at Y, tell me more" instead of asking everything from scratch.

### 5. Hardening and handover

Edge-case suites for the CV pipeline, education-derived skills, retries and graceful degradation, SSE streaming for chat, an API gateway migration in Pulumi, and MongoDB index work.

```python
def detect_persona(user_messages: list[str]) -> PersonaType:
    text = " ".join(user_messages).lower()
    formal = sum(term in text for term in FORMAL_INDICATORS)      # "position", "idara", "mkataba"...
    informal = sum(term in text for term in INFORMAL_INDICATORS)  # "odd jobs", "biashara ndogo"...

    if formal > informal and formal >= 2:
        return PersonaType.FORMAL
    # Default to informal: extra scaffolding never hurts, skipped questions do.
    return PersonaType.INFORMAL
```

## The numbers

Every number below comes from the same harness that set the baseline.

| | Before | After |
| --- | --- | --- |
| Worst-case conversation | 70 turns | ≤35 turns |
| Average conversation | 32.4 turns | ≤27 turns |
| LLM calls per conversation | 251 | ≤200 |
| Question repetition | 11% | ≤8% |
| Languages | English | English and Swahili |

> "He didn't just execute the basic requirements; he proactively suggested forward-looking and sustainable code edits that significantly improved our Python and TypeScript codebase."
>
> Tabiya, Upwork review (5.0)

## What carries over

You can't optimise an agent you can't measure, and you can't localise one by translating strings. The harness found a bug nobody knew existed and made every refactor safe to ship. Real localisation lived in retrieval, taxonomy mapping and persona logic.
