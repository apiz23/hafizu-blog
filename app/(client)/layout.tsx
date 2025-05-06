import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/lib/react-query";
import Loader from "@/components/Preloader";
import { NextAuthProvider } from "@/components/session-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SpeedDial from "@/components/ai-assistant";

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

const fontPoppins = Poppins({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: "500",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={fontPoppins.className}>
				<SidebarProvider>
					{/* <AppSidebar /> */}
					<div className="w-full z-50 fixed">
						<Navbar />
						<Loader />
					</div>
					<SpeedDial />
					<main className="text-white w-full mx-auto z-10 relative">
						<Toaster richColors />
						<NextAuthProvider>
							<ReactQueryProvider>
								{/* <SidebarTrigger className="z-20 fixed" /> */}
								{children}
							</ReactQueryProvider>
						</NextAuthProvider>
					</main>
					{/* <div className="bg-black relative text-white w-full">
						<div className="mx-auto z-10 relative">{children}</div>
					</div> */}
				</SidebarProvider>
			</body>
		</html>
	);
}
