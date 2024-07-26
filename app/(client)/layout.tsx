import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import RetroGrid from "@/components/magicui/retro-grid";
const imagePath = "/images/bg.svg";

export const metadata: Metadata = {
	title: "Hafizu Blog",
	description: "Blog",
	icons: {
		icon: [
			{
				url: "/logo1.png",
				href: "/logo1.png",
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
					<div className="w-full z-50 fixed">
						<Navbar />
					</div>
					<Toaster richColors />
					<div
						className="h-fit bg-black"
						// style={{
						// 	backgroundImage: `url(${imagePath})`,
						// 	backgroundSize: "cover",
						// 	backgroundPosition: "center",
						// }}
					>
						{/* <BackgroundBeams /> */}
						<div className="mx-auto">{children}</div>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
