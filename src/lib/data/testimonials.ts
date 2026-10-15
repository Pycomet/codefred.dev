// Only verified quotes: a real name or organisation, and a link a prospect can check.
// Keep each quote to about three lines; trim with "..." rather than rewording.

export interface Testimonial {
	quote: string;
	name: string;
	role: string;
	source: { label: string; url: string };
}

export const testimonials: Testimonial[] = [
	{
		quote:
			"He didn't just execute the basic requirements; he proactively suggested forward-looking and sustainable code edits...",
		name: 'Tabiya',
		role: 'Compass Kenya, 5 milestones rated 5.0',
		source: { label: 'Upwork review', url: 'https://www.upwork.com/freelancers/codefred' }
	},
	{
		quote:
			'...a great communicator and shows extreme enthusiasm and passion for a project, allowing him to fit into any team and collaborate well with others.',
		name: 'Sadaf Amouzegar',
		role: 'Colleague at RivetAI',
		source: { label: 'LinkedIn recommendation', url: 'https://www.linkedin.com/in/alfredemmanuelinyang/' }
	}
];
