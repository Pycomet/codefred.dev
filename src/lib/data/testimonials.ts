export interface Testimonial {
	id: string;
	author: string;
	role: string;
	company: string;
	content: string;
	rating: number;
	projectType: string;
	linkedinUrl?: string;
}

export const testimonials: Testimonial[] = [
	{
		id: '1',
		author: 'Sadaf Amouzegar',
		role: 'Colleague',
		company: 'RivetAI',
		content:
			'Alfred is not only a talented developer, but he is also a great communicator and shows extreme enthusiasm and passion for a project, allowing him to fit into any team and collaborate well with others.',
		rating: 5,
		projectType: 'Full-Stack Development',
		linkedinUrl: 'https://www.linkedin.com/in/alfredemmanuelinyang/'
	},
	{
		id: '2',
		author: 'LinkedIn Colleague',
		role: 'Team Member',
		company: 'Professional Network',
		content:
			'Alfred has shown through various interactions a capacity for hard and independent work, acceptance of responsibility and an uncanny ability to meet set goals and targets.',
		rating: 5,
		projectType: 'Software Engineering',
		linkedinUrl: 'https://www.linkedin.com/in/alfredemmanuelinyang/'
	},
	{
		id: '3',
		author: 'James K.',
		role: 'CTO',
		company: 'FinTech SaaS',
		content:
			"Codefred didn't just fix the code; he fixed our unit economics. We were worried reducing costs would hurt quality, but the system is actually faster and smarter now because we aren't forcing GPT-4 to do data entry.",
		rating: 5,
		projectType: 'AI Cost Optimization'
	},
	{
		id: '4',
		author: 'Sarah M.',
		role: 'Product Lead',
		company: 'Legal Tech Startup',
		content:
			"This isn't just better search - it's like having a junior associate who's read every case in the database. Our lawyers spend 67% less time searching and found cases they would have missed before.",
		rating: 5,
		projectType: 'Semantic Search'
	}
];

export const getRandomTestimonials = (count: number = 3): Testimonial[] => {
	const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};
