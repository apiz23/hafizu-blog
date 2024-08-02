import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ReactQueryProvider from "@/lib/react-query";
import Loader from "@/components/Preloader";

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
						<Loader />
					</div>
					<Toaster richColors />
					<div className="h-fit bg-black">
						<div className="mx-auto">
							<ReactQueryProvider>{children}</ReactQueryProvider>
						</div>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
