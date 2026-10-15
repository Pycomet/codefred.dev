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
	}
	// Add more only with a real name, role, company and a link to the source
	// (LinkedIn recommendation or Upwork review).
];

export const getRandomTestimonials = (count: number = 3): Testimonial[] => {
	const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};
