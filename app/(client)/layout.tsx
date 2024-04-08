import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
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
					<div className="block md:fixed top-0 left-0 z-50">
						<Navbar />
					</div>
					<Toaster richColors />
					<div
						className="bg-white dark:bg-black sm:ml-80"
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
