# Case Study Structure Guide

This document outlines the standard structure for all case studies on codefred.dev. Following this pattern ensures consistency and makes validation easier.

## Required Components (In Order)

### 1. SEO Component
**Location:** Top of file  
**Purpose:** Meta tags for search engines and social sharing  
**Props:**
- `title` - Full title with keywords and brand name
- `description` - Brief summary (150-160 chars)
- `canonical` - Full URL to the case study page

**Example:**
```svelte
<SEO
	title="AI Cost Reduction Case Study | Cut Costs by 92% | Codefred"
	description="How I reduced a FinTech startup's OpenAI bills from $60K/month to $4.8K while improving latency by 400ms using semantic caching and model routing."
	canonical="https://codefred.dev/case-studies/cost-reduction"
/>
```

---

### 2. CaseStudyHero Component
**Location:** Immediately after SEO  
**Purpose:** Header with project metadata  
**Props:**
- `title` - Main case study headline
- `client` - Client name or type (can be anonymized)
- `role` - Your role in the project
- `timeline` - Duration (e.g., "3 Weeks", "Ongoing")
- `stack` - Array of technologies used

**Example:**
```svelte
<CaseStudyHero
	title="How I Cut AI Infrastructure Costs by 90% (While Improving Latency)"
	client="Series B SaaS (FinTech)"
	role="Technical Consultant"
	timeline="3 Weeks"
	stack={['Python', 'FastAPI', 'Redis', 'OpenAI', 'HuggingFace', 'Vector Store']}
/>
```

---

### 3. Container Wrapper
**Location:** Wraps all content sections  
**Classes:** `container-custom max-w-5xl py-12`

```svelte
<div class="container-custom max-w-5xl py-12">
	<!-- All content goes here -->
</div>
```

---

### 4. TL;DR Section
**Location:** First content section  
**Purpose:** Quick summary for scanners  
**Component:** `ContentSection`

**Example:**
```svelte
<ContentSection title="The TL;DR">
	<p>
		Brief 2-3 sentence summary of the problem and solution.
	</p>
</ContentSection>
```

---

### 5. MetricsGrid Component
**Location:** After TL;DR  
**Purpose:** Eye-catching key metrics  
**Props:**
- `metrics` - Array of 3 metric objects with:
  - `value` - The number/percentage
  - `label` - What it represents
  - `highlight` - Boolean (usually all true)

**Example:**
```svelte
<MetricsGrid
	metrics={[
		{ value: '92%', label: 'Cost Reduction', highlight: true },
		{ value: '3x', label: 'Faster Response', highlight: true },
		{ value: '$55K', label: 'Saved Monthly', highlight: true }
	]}
/>
```

---

### 6. Problem Section
**Location:** After metrics  
**Purpose:** Detailed problem description  
**Component:** `ContentSection` with `CalloutBox`

**Pattern:**
```svelte
<ContentSection title="The Problem: [Descriptive Name]">
	<p>Context and background...</p>
	
	<CalloutBox type="warning" title="Pain Points">
		<ul>
			<li>Specific problem 1</li>
			<li>Specific problem 2</li>
			<li>Specific problem 3</li>
		</ul>
	</CalloutBox>
	
	<p>Additional context or impact...</p>
</ContentSection>
```

**CalloutBox types:** `warning`, `info`, `success`, `tip`

---

### 7. Solution Section
**Location:** After problem  
**Purpose:** Your approach and architecture  
**Component:** `ContentSection` with `variant="highlight"` + `CalloutBox`

**Pattern:**
```svelte
<ContentSection title="The Solution: [Approach Name]" variant="highlight">
	<p>Overview of solution...</p>
	
	<h3>Phase 1: [First Step]</h3>
	<p>Details...</p>
	
	<CalloutBox type="success" title="The Fix">
		<ul>
			<li>Action 1</li>
			<li>Action 2</li>
			<li><strong>Impact:</strong> Result</li>
		</ul>
	</CalloutBox>
	
	<h3>Phase 2: [Second Step]</h3>
	<!-- Repeat pattern -->
</ContentSection>
```

---

### 8. Technical Implementation
**Location:** After solution  
**Purpose:** Show code/architecture  
**Component:** `CodeBlock`

**Props:**
- `language` - Programming language
- `title` - Descriptive title
- `code` - The code snippet (as string literal)

**Example:**
```svelte
<ContentSection title="The Technical Implementation">
	<p>Explanation...</p>
</ContentSection>

<CodeBlock
	language="python"
	title="Traffic Controller Logic"
	code={`async def route_request(user_query: str):
    # Your code here
    pass`}
/>
```

---

### 9. Outcome Section
**Location:** After technical details  
**Purpose:** Results and impact  
**Component:** `ComparisonTable`

**Props:**
- `title` - Optional table title
- `rows` - Array of comparison objects with:
  - `metric` - What's being measured
  - `before` - Previous state
  - `after` - New state
  - `change` - Improvement (optional)

**Example:**
```svelte
<ContentSection title="The Outcome">
	<p>Deployment story...</p>
</ContentSection>

<ComparisonTable
	rows={[
		{ metric: 'Monthly Cost', before: '$62,400', after: '$4,850', change: '-92%' },
		{ metric: 'Avg Latency', before: '2.4s', after: '0.8s', change: '3x Faster' },
		{ metric: 'Reliability', before: '99.1%', after: '99.9%', change: 'No Rate Limits' }
	]}
/>
```

---

### 10. Testimonial (Optional)
**Location:** After outcome  
**Purpose:** Social proof  
**Component:** `Testimonial`

**Props:**
- `quote` - Client testimonial
- `author` - Client name
- `role` - Client's position (optional)

**Example:**
```svelte
<Testimonial
	quote="Codefred didn't just fix the code; he fixed our unit economics."
	author="James K."
	role="CTO"
/>
```

---

### 11. Lesson Section
**Location:** Near end, before CTA  
**Purpose:** Key takeaways and philosophy  
**Component:** `ContentSection` with `variant="dark"` + `CalloutBox type="tip"`

**Pattern:**
```svelte
<ContentSection title="The Lesson" variant="dark">
	<p class="text-lg text-text-primary font-semibold">
		Main philosophical point...
	</p>
	<p>
		Elaboration...
	</p>
	
	<CalloutBox type="tip" title="Key Takeaways">
		<ul>
			<li><strong>Point 1:</strong> Explanation</li>
			<li><strong>Point 2:</strong> Explanation</li>
			<li><strong>Point 3:</strong> Explanation</li>
		</ul>
	</CalloutBox>
</ContentSection>
```

---

### 12. CaseStudyCTA Component
**Location:** Last element in container  
**Purpose:** Call to action  
**Props:**
- `title` - Optional custom title
- `description` - Optional custom description

**Example:**
```svelte
<CaseStudyCTA />

<!-- OR with custom props -->
<CaseStudyCTA 
	title="Need honest technical guidance?"
	description="I'll tell you if AI won't solve your problem. Book a consultation for an honest assessment."
/>
```

---

## Component Variants Reference

### ContentSection
- Default: White background
- `variant="highlight"` - Light blue background for emphasis
- `variant="dark"` - Dark background for lessons/philosophy

### CalloutBox
- `type="warning"` - Yellow/orange for problems
- `type="info"` - Blue for neutral information
- `type="success"` - Green for solutions/wins
- `type="tip"` - Purple/cyan for takeaways

---

## Validation Checklist

Before publishing a case study, verify:

- [ ] SEO component with unique title, description, canonical
- [ ] CaseStudyHero with all 5 props
- [ ] TL;DR section exists
- [ ] MetricsGrid with exactly 3 metrics
- [ ] Problem section with CalloutBox
- [ ] Solution section with variant="highlight"
- [ ] At least one CodeBlock (if technical)
- [ ] ComparisonTable showing before/after
- [ ] Lesson section with variant="dark"
- [ ] CaseStudyCTA at the end
- [ ] All images have alt text
- [ ] All external links have target="_blank" rel="noopener noreferrer"

---

## Example Structure (Skeleton)

```svelte
<script lang="ts">
	// Component imports
</script>

<SEO ... />

<CaseStudyHero ... />

<div class="container-custom max-w-5xl py-12">
	<ContentSection title="The TL;DR">...</ContentSection>
	
	<MetricsGrid ... />
	
	<ContentSection>...</ContentSection>
	
	<ContentSection title="The Problem: ...">
		<CalloutBox type="warning">...</CalloutBox>
	</ContentSection>
	
	<ContentSection title="The Solution: ..." variant="highlight">
		<CalloutBox type="success">...</CalloutBox>
	</ContentSection>
	
	<ContentSection title="The Technical Implementation">...</ContentSection>
	
	<CodeBlock ... />
	
	<ContentSection title="The Outcome">...</ContentSection>
	
	<ComparisonTable ... />
	
	<Testimonial ... />
	
	<ContentSection title="The Lesson" variant="dark">
		<CalloutBox type="tip">...</CalloutBox>
	</ContentSection>
	
	<CaseStudyCTA />
</div>
```

---

## Notes

- Keep case studies between 800-1500 words
- Use specific numbers and metrics wherever possible
- Include at least one code example (except for non-technical case studies)
- Client names can be anonymized if needed
- Always end with actionable takeaways
- Maintain honest, no-BS tone consistent with brand

