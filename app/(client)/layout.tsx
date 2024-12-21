import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/lib/react-query";
import Loader from "@/components/Preloader";
import { NextAuthProvider } from "@/components/session-provider";

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
	weight: "500"
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={fontPoppins.className}>
				<div className="w-full z-50 fixed">
					<Navbar />
					<Loader />
				</div>
				<Toaster richColors />
				<div className="bg-black relative text-white">
					<div className="mx-auto z-10 relative">
						<NextAuthProvider>
							<ReactQueryProvider>{children}</ReactQueryProvider>
						</NextAuthProvider>
					</div>
				</div>
			</body>
		</html>
	);
}
