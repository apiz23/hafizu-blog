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
	},
};

export default nextConfig;
