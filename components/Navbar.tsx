"use client";

import {
	Home,
	LucideLink,
	Lock,
	Menu,
	Calculator,
	MessageSquare,
	LogOut,
} from "lucide-react";
import Link from "next/link";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	MdDashboard,
	MdKeyboardArrowUp,
	MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import Footer from "./footer";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { redirect, usePathname } from "next/navigation";
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
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
	const pathname = usePathname();
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const itemNav = [
		{ title: "Home", url: "/", icon: Home },
		{ title: "Feed", url: "/feed", icon: MessageSquare },
		{ title: "Link", url: "/link", icon: LucideLink },
		{ title: "Calculator", url: "/calculator", icon: Calculator },
		{ title: "Admin", url: "/login", icon: Lock },
	];

	const handleToggleMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	return (
		<>
			<nav className="fixed top-0 left-0 w-full z-50">
				<div className="p-4 h-full">
					<div className="block md:hidden flex-col h-full">
						<Sheet>
							<SheetTrigger>
								<Menu className="hover:text-zinc-500" />
							</SheetTrigger>
							<SheetContent side="left" className="h-full w-2/3 flex flex-col">
								<SheetHeader>
									<SheetTitle className="flex">
										<span className="text-2xl px-5 flex font-semibold whitespace-nowrap dark:text-white text-black">
											Hafizu Blog
										</span>
									</SheetTitle>
								</SheetHeader>
								<div className="flex-1 overflow-auto">
									{itemNav.map((item, index) => (
										<SheetClose asChild key={index}>
											<Link href={item.url} passHref>
												<div
													className={`p-5 border bg-white dark:bg-black flex space-x-3 text-black dark:text-white border-black dark:border-white rounded-md my-5 mx-5 dark:hover:bg-slate-800 hover:bg-slate-200 ${
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
					<div className="justify-center hidden md:flex">
						<button
							onClick={handleToggleMenu}
							className="mt-2 p-2 bg-neutral-700 bg-opacity-70 text-white rounded-full"
						>
							{isMenuVisible ? <MdOutlineKeyboardArrowDown /> : <MdKeyboardArrowUp />}
						</button>
					</div>
					<motion.div
						className="w-fit mx-auto pt-2"
						initial={{ opacity: 0, translateY: -10, filter: "blur(10px)" }}
						animate={{
							opacity: isMenuVisible ? 1 : 0,
							translateY: isMenuVisible ? 0 : -10,
							filter: isMenuVisible ? "blur(0)" : "blur(10px)",
						}}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem className="flex w-full bg-neutral-700 rounded-full p-2">
									{itemNav.map((item, index) => (
										<TooltipProvider key={index}>
											<Tooltip>
												<TooltipTrigger>
													<NavigationMenuLink
														key={index}
														href={item.url}
														className={`flex mx-5 py-2 ${
															pathname === item.url
																? "text-yellow-500"
																: "text-gray-700 dark:text-gray-300"
														}`}
													>
														{pathname === item.url ? (
															<item.icon className="h-5 w-5 text-yellow-500" />
														) : (
															<item.icon className="h-5 w-5" />
														)}
														<p
															className={`ms-2 ${
																pathname === item.url
																	? "text-yellow-500"
																	: "text-gray-700 dark:text-gray-300 hover:block hidden"
															}`}
														>
															{item.title}
														</p>
													</NavigationMenuLink>
												</TooltipTrigger>
												<TooltipContent>
													<p>{item.title}</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									))}
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</motion.div>
				</div>
			</nav>
		</>
	);
}

export function NavbarAd() {
	const { data: session } = useSession();
	const pathname = usePathname();
	const itemNav = [{ title: "Dashboard", url: "/dashboard", icon: MdDashboard }];
	return (
		<>
			<nav className="fixed top-0 left-0 w-full z-50">
				<div className="mt-5 p-4 h-full">
					<Sheet>
						<SheetTrigger>
							<Menu className="hover:text-zinc-500" />
						</SheetTrigger>
						<SheetContent side="left" className="h-full w-2/3 flex flex-col">
							<SheetHeader>
								<SheetTitle className="flex">
									<span className="text-2xl px-5 flex font-semibold whitespace-nowrap dark:text-white text-black">
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
													className={`p-5 border bg-white dark:bg-black flex space-x-3 text-black dark:text-white border-black dark:border-white rounded-md my-5 mx-5 dark:hover:bg-slate-800 hover:bg-slate-200 ${
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
								className="mx-5"
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
