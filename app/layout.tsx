import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
	title: "Hafizu Blog",
	description: "Blog",
	icons: {
		icon: [
			{
				url: "/logo.png",
				href: "/logo.png",
			},
		],
	},
};

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={fontSans.className}>{children}</body>
		</html>
	);
}
