// Case studies live as Markdown in src/content/case-studies/*.md.
// Adding one = adding a file; nothing else needs editing.
import type { Component } from 'svelte';

export const areas = {
	'ai-cost': 'AI cost',
	agents: 'Agents and LLM pipelines',
	'computer-vision': 'Computer vision',
	'full-stack': 'Full-stack builds'
} as const;
export type Area = keyof typeof areas;

export interface CaseStudyMeta {
	slug: string;
	title: string; // written around the problem people search for
	summary: string; // one line for cards and meta description
	area: Area;
	client: string; // named only where permission exists
	role: string;
	timeline: string;
	order: number; // position on /work, lowest first
	featured?: number; // position in the home proof strip (1-3)
	published: boolean;
	// The one result shown everywhere, as before -> after
	result: { before: string; after: string; label: string };
	problem: string;
	approach: string;
	outcome: string;
	stack: string[];
}

interface Module {
	metadata: CaseStudyMeta;
	default: Component;
}

const modules = import.meta.glob<Module>('/src/content/case-studies/*.md', { eager: true });

const all = Object.entries(modules).map(([path, mod]) => {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	if (mod.metadata.slug !== slug) {
		throw new Error(`Case study ${path}: frontmatter slug "${mod.metadata.slug}" must match the file name`);
	}
	return { meta: mod.metadata, component: mod.default };
});

/** Published case studies in display order */
export const caseStudies = all.filter((c) => c.meta.published).sort((a, b) => a.meta.order - b.meta.order);

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.meta.slug === slug);

/** The home page proof strip, in the order set by `featured` */
export const featuredCaseStudies = caseStudies
	.filter((c) => c.meta.featured)
	.sort((a, b) => a.meta.featured! - b.meta.featured!)
	.map((c) => c.meta);
