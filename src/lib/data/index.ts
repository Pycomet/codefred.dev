// Central export point for all data

export { personalData } from './personal';
export { projects, getFeaturedProjects, getProjectsByCategory, getProjectById } from './projects';
export { experiences, getExperienceByCategory, getTotalYearsOfExperience } from './experience';
export {
	expertiseCategories,
	allSkills,
	getSkillByName,
	getTopSkills,
	getSkillsByCategory,
	getAISkills,
	getCoreSkills,
	getInfraSkills
} from './expertise';
export { education } from './education';
export {
	consultationPackages,
	getPackageById,
	getFeaturedPackage
} from './consultation-packages';
export { contentData, testimonials } from './content';
export {
	caseStudies,
	getFeaturedCaseStudies,
	getCaseStudiesByCategory,
	getCaseStudyBySlug
} from './case-studies';
