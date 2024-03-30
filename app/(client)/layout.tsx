import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
const imagePath = "/images/bg.svg";

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
			<body className={fontSans.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<div
						className="bg-white dark:bg-black"
						style={{
							backgroundImage: `url(${imagePath})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<div className="max-w-screen-xl mx-auto">{children}</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
