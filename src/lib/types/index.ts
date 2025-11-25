// Core data type definitions for the portfolio

export interface PersonalData {
	name: string;
	designation: string;
	bio: {
		short: string; // For hero section
		medium: string; // For about section
		long: string; // For detailed about page
	};
	availability: string; // e.g., "Taking 2 new clients for December"
	timezone: string; // e.g., "WAT (UTC+1)"
	location: string;
	email: string;
	phone: string;
	profileImage: string;
	resume: string;
	social: {
		github: string;
		linkedin: string;
		twitter: string;
		stackoverflow?: string;
		leetcode?: string;
		devto: string; // username for dev.to
		youtube?: string; // channel URL
	};
}

export interface Project {
	id: number;
	name: string;
	tagline: string;
	description: string;
	category: 'ai' | 'full-stack' | 'laboratory' | 'infrastructure';
	featured: boolean;
	tools: string[];
	role: string;
	status: string; // e.g., "✅ Delivered & Running", "🔬 Live Laboratory"
	metrics?: {
		[key: string]: string | number; // e.g., scale: "50+ streams", accuracy: "97%"
	};
	positioning?: string; // Special positioning text (for GrindProof)
	clientValue?: string; // Value proposition for clients
	links: {
		github?: string;
		demo?: string;
		caseStudy?: string;
	};
	visual?: string; // Path to screenshot or diagram
}

export interface Experience {
	id: number;
	title: string;
	company: string;
	duration: string;
	category: 'full-time' | 'freelance' | 'consulting';
	description?: string;
	achievements?: string[];
	techStack?: string[];
}

export interface SkillCategory {
	name: string;
	skills: Skill[];
}

export interface Skill {
	name: string;
	level: number; // 0-100
	years: number;
	projects: number;
}

export interface Education {
	id: number;
	title: string;
	institution: string;
	duration: string;
	description?: string;
}

export interface ConsultationPackage {
	id: string; // e.g., "ai-audit", "implementation-sprint"
	name: string;
	price: string;
	duration: string;
	badge?: string; // e.g., "Most Popular", "Enterprise"
	description: string;
	includes: string[];
	cta: string;
	calLink: string; // Cal.com booking link
	availability: string;
}

export interface Testimonial {
	id: number;
	quote: string;
	author: string;
	role: string;
	company?: string;
	projectType: 'ai' | 'full-stack' | 'leadership';
	metric?: string; // e.g., "Saved $2M"
	featured: boolean;
}

export interface CaseStudy {
	slug: string;
	title: string;
	tagline: string;
	client: string;
	role: string;
	timeline: string;
	category: 'ai' | 'full-stack' | 'architecture';
	featured: boolean;
	excerpt: string;
	metrics: {
		[key: string]: string | number;
	};
	techStack: string[];
	image?: string; // OG image path
}

export interface ContentData {
	heroHeadlines: string[];
	problems: Problem[];
	differentiators: Differentiator[];
	trustIndicators: string[];
	metrics: {
		yearsExperience: number;
		productionSystems: string;
		currentRole: string;
		availability: string;
	};
}

export interface Problem {
	id: number;
	problem: string;
	solution: string;
	caseStudyLink?: string;
}

export interface Differentiator {
	id: number;
	icon: string;
	title: string;
	description: string;
}
