import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { BackgroundBeams } from "@/components/ui/background-beams";
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
					<div className="fixed w-full">
						<Navbar />
					</div>
					<Toaster richColors />
					<div
						className="bg-neutral-100 dark:bg-black"
						style={{
							backgroundImage: `url(${imagePath})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<BackgroundBeams />
						<div className="max-w-screen-xl mx-auto">{children}</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
