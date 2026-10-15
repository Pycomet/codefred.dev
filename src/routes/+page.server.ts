import { getFeed } from '$lib/server/youtube';
import { shortsAsPosts, instagramAsPosts } from '$lib/server/posts';
import { featuredCaseStudies, caseStudies } from '$lib/content/case-studies';

export const load = async () => {
	const feed = await getFeed();
	// Three newest posts: Shorts come in automatically, hand-picked Instagram fills any gap
	const posts = [...shortsAsPosts(feed.shorts), ...instagramAsPosts()].slice(0, 3);

	return {
		latest: feed.videos[0] ?? null,
		posts,
		proof: featuredCaseStudies,
		// Only areas with case studies get a filtered /work link
		usedAreas: [...new Set(caseStudies.map((c) => c.meta.area))]
	};
};
