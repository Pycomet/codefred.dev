import type { Experience } from '$lib/types';

export const experiences: Experience[] = [
	{
		id: 1,
		title: 'Senior Full Stack Engineer',
		company: 'InferenceCloud.ai',
		duration: '(Feb 2024 - Present)',
		category: 'full-time',
		description:
			'Building AI infrastructure and full-stack applications for InferenceCloud, focusing on scalable ML deployment systems and production-grade AI implementations.',
		achievements: [
			'Architecting cloud-native AI systems serving production traffic',
			'Building full-stack applications with modern React and FastAPI',
			'Implementing MLOps practices for model deployment and monitoring',
			'Collaborating with distributed team across multiple time zones'
		],
		techStack: ['Python', 'TypeScript', 'React', 'FastAPI', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL']
	},
	{
		id: 2,
		title: 'Senior Software Engineer',
		company: 'RivetAI',
		duration: '(Jan 2023 - Feb 2024)',
		category: 'full-time',
		description:
			'Led development of AI-powered applications and system architecture as a senior engineer. Focused on computer vision, real-time processing, and scalable backend systems.',
		achievements: [
			'Designed and implemented real-time computer vision systems processing 50+ concurrent video streams',
			'Built AI pipelines with 97% accuracy for threat detection and security applications',
			'Architected microservices handling millions of daily requests',
			'Mentored junior engineers on system design and AI implementation best practices'
		],
		techStack: [
			'Python',
			'TensorFlow',
			'OpenCV',
			'FastAPI',
			'Redis',
			'RTSP',
			'Docker',
			'AWS EC2',
			'PostgreSQL'
		]
	},
	{
		id: 3,
		title: 'Full Stack Developer',
		company: 'Glibx Inc',
		duration: '(Feb 2021 - Sept 2022)',
		category: 'full-time',
		description:
			'Developed full-stack web applications and APIs for diverse clients. Specialized in modern JavaScript frameworks, cloud infrastructure, and database optimization.',
		achievements: [
			'Built and deployed 10+ production applications for international clients',
			'Implemented CI/CD pipelines reducing deployment time by 70%',
			'Optimized database queries improving application performance by 3x',
			'Established code review practices and testing standards'
		],
		techStack: [
			'React',
			'Next.js',
			'Node.js',
			'Express',
			'NestJS',
			'TypeScript',
			'MongoDB',
			'MySQL',
			'AWS',
			'Docker'
		]
	},
	{
		id: 4,
		title: 'Self Employed',
		company: 'Upwork (Freelance)',
		duration: '(2019 - Present)',
		category: 'freelance',
		description:
			'Independent consultant and freelance developer delivering custom software solutions. Working with startups and established companies across multiple industries and continents.',
		achievements: [
			'Successfully delivered 50+ projects with 100% client satisfaction rate',
			'Built long-term relationships with repeat clients across 12 countries',
			'Specialized in rescuing failing projects and optimizing existing systems',
			'Generated consistent revenue through technical consulting and development'
		],
		techStack: [
			'Python',
			'Django',
			'React',
			'Next.js',
			'TypeScript',
			'AWS',
			'MongoDB',
			'PostgreSQL',
			'Stripe',
			'Twilio'
		]
	}
];

// Helper functions
export const getExperienceByCategory = (category: Experience['category']) =>
	experiences.filter((exp) => exp.category === category);

export const getTotalYearsOfExperience = (): number => {
	// Calculate from first freelance work (2019) to present
	const startYear = 2019;
	const currentYear = new Date().getFullYear();
	return currentYear - startYear;
};
