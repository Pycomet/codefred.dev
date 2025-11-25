import type { SkillCategory } from '$lib/types';

export const expertiseCategories: SkillCategory[] = [
	{
		name: 'Core Engineering',
		skills: [
			{ name: 'Python', level: 95, years: 8, projects: 30 },
			{ name: 'TypeScript', level: 90, years: 6, projects: 25 },
			{ name: 'JavaScript', level: 92, years: 8, projects: 35 },
			{ name: 'System Architecture', level: 88, years: 8, projects: 50 },
			{ name: 'React', level: 90, years: 6, projects: 30 },
			{ name: 'Next.js', level: 88, years: 4, projects: 20 }
		]
	},
	{
		name: 'AI & Machine Learning',
		skills: [
			{ name: 'LLMs/GPT', level: 85, years: 2, projects: 8 },
			{ name: 'OpenAI API', level: 88, years: 2, projects: 10 },
			{ name: 'Computer Vision', level: 75, years: 3, projects: 5 },
			{ name: 'Vector Databases', level: 80, years: 2, projects: 6 },
			{ name: 'TensorFlow', level: 72, years: 3, projects: 4 },
			{ name: 'AI Integration', level: 85, years: 3, projects: 12 }
		]
	},
	{
		name: 'Infrastructure & DevOps',
		skills: [
			{ name: 'AWS', level: 85, years: 6, projects: 20 },
			{ name: 'Docker', level: 80, years: 4, projects: 15 },
			{ name: 'Kubernetes', level: 75, years: 3, projects: 8 },
			{ name: 'FastAPI', level: 90, years: 4, projects: 15 },
			{ name: 'Node.js', level: 88, years: 7, projects: 25 },
			{ name: 'PostgreSQL', level: 85, years: 6, projects: 20 },
			{ name: 'MongoDB', level: 82, years: 5, projects: 18 },
			{ name: 'Redis', level: 78, years: 4, projects: 10 },
			{ name: 'Nginx', level: 75, years: 5, projects: 15 }
		]
	},
	{
		name: 'Frontend & Design',
		skills: [
			{ name: 'Tailwind CSS', level: 92, years: 4, projects: 25 },
			{ name: 'CSS/SCSS', level: 88, years: 8, projects: 40 },
			{ name: 'HTML', level: 95, years: 8, projects: 50 },
			{ name: 'Material UI', level: 80, years: 4, projects: 12 },
			{ name: 'Figma', level: 70, years: 3, projects: 15 },
			{ name: 'Responsive Design', level: 90, years: 7, projects: 45 }
		]
	},
	{
		name: 'Backend & APIs',
		skills: [
			{ name: 'Django', level: 85, years: 6, projects: 15 },
			{ name: 'Express', level: 88, years: 6, projects: 20 },
			{ name: 'NestJS', level: 82, years: 3, projects: 10 },
			{ name: 'REST APIs', level: 92, years: 8, projects: 45 },
			{ name: 'GraphQL', level: 75, years: 2, projects: 5 },
			{ name: 'WebSockets', level: 78, years: 3, projects: 8 }
		]
	}
];

// Flat list of all skills (for backward compatibility and skill search)
export const allSkills = expertiseCategories.flatMap((category) =>
	category.skills.map((skill) => ({
		...skill,
		category: category.name
	}))
);

// Helper functions
export const getSkillByName = (name: string) => allSkills.find((skill) => skill.name === name);

export const getTopSkills = (limit: number = 10) =>
	[...allSkills].sort((a, b) => b.level - a.level).slice(0, limit);

export const getSkillsByCategory = (categoryName: string) =>
	expertiseCategories.find((cat) => cat.name === categoryName)?.skills || [];

// Get skills for a specific use case
export const getAISkills = () => getSkillsByCategory('AI & Machine Learning');
export const getCoreSkills = () => getSkillsByCategory('Core Engineering');
export const getInfraSkills = () => getSkillsByCategory('Infrastructure & DevOps');
