"use client";

import { Home, Lock, Menu, Sigma, LogOut, Image } from "lucide-react";
import { FaRegFile } from "react-icons/fa6";
import Link from "next/link";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MdDashboard, MdOutlineFeed } from "react-icons/md";

import Footer from "./footer";
import { usePathname } from "next/navigation";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { deleteCookies } from "@/lib/auth";
import { Button } from "./ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
export default function Navbar() {
	const pathname = usePathname();

	const itemNav = [
		{ title: "Home", url: "/", icon: Home },
		// { title: "Feed", url: "/feed", icon: MessageSquare },
		// { title: "UTHM Photo Finder", url: "/uthmPhotoFinder", icon: Image },
		{ title: "Link", url: "/link", icon: FaRegFile },
		{ title: "Math", url: "/math", icon: Sigma },
		{ title: "Admin", url: "/login", icon: Lock },
	];

	return (
		<>
			<nav className="fixed bottom-auto md:bottom-0 top-0 md:top-auto left-0 w-full z-50">
				<div className="p-4 h-full">
					<div className="block md:hidden flex-col h-full">
						<Sheet>
							<SheetTrigger>
								<Menu className="hover:text-zinc-500 text-white" />
							</SheetTrigger>
							<SheetContent
								side="left"
								className="bg-black text-white h-full w-3/4 flex flex-col"
							>
								<SheetHeader>
									<SheetTitle className="flex">
										<span className="text-2xl px-5 flex font-semibold whitespace-nowraptext-white text-white">
											Hafizu Blog
										</span>
									</SheetTitle>
								</SheetHeader>
								<div className="flex-1 overflow-auto">
									{itemNav.map((item, index) => (
										<SheetClose asChild key={index}>
											<Link href={item.url} passHref>
												<div
													className={`p-5 border bg-whitebg-black flex space-x-3 text-blacktext-white border-blackborder-white rounded-md my-5 mx-5hover:bg-slate-800 hover:bg-slate-200 ${
														pathname === item.url ? "text-yellow-500" : ""
													}`}
												>
													<item.icon
														className={
															pathname === item.url ? "h-5 w-5 text-yellow-500" : "h-5 w-5"
														}
													/>
													<p className={pathname === item.url ? "text-yellow-500" : ""}>
														{item.title}
													</p>
												</div>
											</Link>
										</SheetClose>
									))}
								</div>
								<Footer />
							</SheetContent>
						</Sheet>
					</div>
					<TooltipProvider>
						<Dock
							direction="middle"
							className="bg-black bg-opacity-50 border-yellow-500/80 border-2 text-white mb-5 md:flex hidden"
						>
							{itemNav.map((item, index) => (
								<DockIcon
									key={index}
									className="hover:cursor-pointer hover:text-yellow-500"
								>
									<Tooltip>
										<TooltipTrigger asChild>
											<Link href={item.url} passHref>
												<item.icon className="h-5 w-5" />
											</Link>
										</TooltipTrigger>
										<TooltipContent>
											<p>{item.title}</p>
										</TooltipContent>
									</Tooltip>
								</DockIcon>
							))}
						</Dock>
					</TooltipProvider>
				</div>
			</nav>
		</>
	);
}

export function NavbarAd() {
	const { data: session } = useSession();

	if (session && session.user && session.user.email) {
		sessionStorage.setItem("user-email", session.user.email);
	}

	const pathname = usePathname();

	const itemNav = [
		{ title: "Dashboard", url: "/dashboard", icon: MdDashboard },
		{ title: "Posts", url: "/posts", icon: MdOutlineFeed },
	];

	return (
		<>
			<nav className="fixed top-0 left-0 w-full z-50">
				<div className="mt-5 p-4 h-full">
					<Sheet>
						<SheetTrigger>
							<Menu className="hover:text-zinc-500 text-white" />
						</SheetTrigger>
						<SheetContent
							side="left"
							className="h-full w-2/3 flex flex-col bg-black text-white"
						>
							<SheetHeader>
								<SheetTitle className="flex">
									<span className="text-2xl px-5 flex font-semibold whitespace-nowraptext-white text-white">
										Hafizu Blog
									</span>
								</SheetTitle>
							</SheetHeader>
							<div className="py-5 bg-black flex space-x-3 text-white my-5 mx-5">
								<Avatar>
									<AvatarImage src={session?.user?.image as string} />
									<AvatarFallback>
										{session?.user?.name
											?.split(" ")
											.map((word) => word[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<p className="text-lg font-semibold capitalize">
									{session?.user?.name}
								</p>
							</div>
							<div className="flex-1 overflow-auto">
								{itemNav.map((item, index) => (
									<SheetClose asChild key={index}>
										<>
											<Link href={item.url} passHref>
												<div
													className={`p-5 border bg-whitebg-black flex space-x-3 text-blacktext-white border-white rounded-md my-5 mx-5 hover:bg-slate-800 ${
														pathname === item.url ? "text-yellow-500" : ""
													}`}
												>
													<item.icon
														className={
															pathname === item.url ? "h-5 w-5 text-yellow-500" : "h-5 w-5"
														}
													/>
													<p className={pathname === item.url ? "text-yellow-500" : ""}>
														{item.title}
													</p>
												</div>
											</Link>
										</>
									</SheetClose>
								))}
							</div>
							<Button
								onClick={() => {
									signOut();
									deleteCookies();
								}}
								className="mx-5 text-white bg-gray-500"
							>
								<LogOut />
							</Button>
							<Footer />
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</>
	);
}
