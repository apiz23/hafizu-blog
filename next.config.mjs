/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["img.youtube.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
		],
		domains: [
			"api.microlink.io",
			"ykzglhnkmwqyekcvutgx.supabase.co",
			"community.uthm.edu.my",
		],
	},
};

export default nextConfig;
