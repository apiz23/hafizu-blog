import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ReactQueryProvider from "@/lib/react-query";
import Loader from "@/components/Preloader";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/utils/cn";
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
				<div className="w-full z-50 fixed">
					<Navbar />
					<Loader />
				</div>
				<Toaster richColors />
				<div className="bg-black relative text-white">
					<DotPattern
						width={20}
						height={20}
						cx={1}
						cy={1}
						cr={1}
						className={cn(
							"fixed bottom-0 left-0 right-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] z-0"
						)}
					/>
					<div className="mx-auto z-10 relative">
						<NextAuthProvider>
							<ReactQueryProvider>{children}</ReactQueryProvider>
						</NextAuthProvider>
					</div>
					<DotPattern
						width={20}
						height={20}
						cx={1}
						cy={1}
						cr={1}
						className={cn(
							"fixed bottom-0 left-0 right-0 [mask-image:linear-gradient(to_top_left,white,transparent,transparent)] z-0"
						)}
					/>
					{/* <Footer /> */}
				</div>
			</body>
		</html>
	);
}
