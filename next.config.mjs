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
		domains: ["i.pinimg.com"],
	},
};

export default nextConfig;
