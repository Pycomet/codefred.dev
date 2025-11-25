import type { Education } from '$lib/types';

export const education: Education[] = [
	{
		id: 1,
		title: 'Bachelor of Technology',
		institution: 'Federal University of Technology, Minna',
		duration: '2014 - 2019',
		description:
			'Studied Mechanical Engineering with focus on automated systems, robotics, physics, advanced mathematics, heat/mass transfer, and electric circuits. Built strong analytical and problem-solving foundation.'
	},
	{
		id: 2,
		title: 'CS50: Introduction to Computer Science',
		institution: 'Harvard University',
		duration: '2020',
		description:
			"Harvard's rigorous introduction to computer science and programming. Covered algorithms, data structures, software engineering, web development, and computational thinking."
	},
	{
		id: 3,
		title: 'Considering: MSc Software Engineering',
		institution: 'Quantic School of Business and Technology',
		duration: 'Future',
		description:
			'Exploring advanced degree in Software Engineering to deepen expertise in system design, distributed systems, and engineering leadership.'
	}
];
