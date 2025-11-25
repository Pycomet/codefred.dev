import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import axios from 'axios';

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
let cachedData: {
	user: any;
	repos: any[];
	timestamp: number;
} | null = null;

// GitHub username (from personal data)
const GITHUB_USERNAME = 'pycomet';

// Helper function to check if cache is valid
function isCacheValid(): boolean {
	if (!cachedData) return false;
	const now = Date.now();
	return now - cachedData.timestamp < CACHE_DURATION;
}

// Fetch GitHub user data
async function fetchUserData() {
	try {
		const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching GitHub user data:', error);
		throw error;
	}
}

// Fetch GitHub repositories
async function fetchRepositories() {
	try {
		const response = await axios.get(
			`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
		);

		// Filter and sort repos
		const repos = response.data
			.filter((repo: any) => !repo.fork && !repo.private)
			.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
			.slice(0, 12) // Top 12 repos
			.map((repo: any) => ({
				id: repo.id,
				name: repo.name,
				fullName: repo.full_name,
				description: repo.description,
				url: repo.html_url,
				homepage: repo.homepage,
				stars: repo.stargazers_count,
				forks: repo.forks_count,
				watchers: repo.watchers_count,
				language: repo.language,
				topics: repo.topics || [],
				createdAt: repo.created_at,
				updatedAt: repo.updated_at,
				size: repo.size
			}));

		return repos;
	} catch (error) {
		console.error('Error fetching GitHub repositories:', error);
		throw error;
	}
}

export async function GET({ request }: RequestEvent) {
	try {
		// Check if we have valid cached data
		if (isCacheValid() && cachedData) {
			return json(
				{
					success: true,
					data: {
						user: cachedData.user,
						repos: cachedData.repos
					},
					cached: true
				},
				{
					headers: {
						'Cache-Control': 'public, max-age=3600' // 1 hour
					}
				}
			);
		}

		// Fetch fresh data
		const [userData, reposData] = await Promise.all([
			fetchUserData(),
			fetchRepositories()
		]);

		// Format user data
		const user = {
			username: userData.login,
			name: userData.name,
			avatar: userData.avatar_url,
			bio: userData.bio,
			company: userData.company,
			location: userData.location,
			blog: userData.blog,
			twitter: userData.twitter_username,
			publicRepos: userData.public_repos,
			publicGists: userData.public_gists,
			followers: userData.followers,
			following: userData.following,
			createdAt: userData.created_at,
			updatedAt: userData.updated_at
		};

		// Update cache
		cachedData = {
			user,
			repos: reposData,
			timestamp: Date.now()
		};

		return json(
			{
				success: true,
				data: {
					user,
					repos: reposData
				},
				cached: false
			},
			{
				headers: {
					'Cache-Control': 'public, max-age=3600' // 1 hour
				}
			}
		);
	} catch (error) {
		console.error('GitHub API Error:', error);
		return json(
			{
				success: false,
				message: 'Failed to fetch GitHub data'
			},
			{ status: 500 }
		);
	}
}
