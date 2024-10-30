"use client";

import {
	Home,
	Lock,
	Menu,
	Calculator,
	MessageSquare,
	LogOut,
	User2,
	ChevronUp,
	ChevronDown,
} from "lucide-react";
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
import { useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
export default function Navbar() {
	const pathname = usePathname();

	const itemNav = [
		{ title: "Home", url: "/", icon: Home },
		{ title: "Feed", url: "/feed", icon: MessageSquare },
		{ title: "Link", url: "/link", icon: FaRegFile },
		{ title: "Calculator", url: "/calculator", icon: Calculator },
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
								className="bg-black text-white h-full w-2/3 flex flex-col"
							>
								<SheetHeader>
									<SheetTitle className="flex">
										<span className="text-2xl px-5 flex font-semibold whitespace-nowraptext-white text-black">
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
							className="bg-black bg-opacity-50 border-gray-700 border-2 text-white mb-5 md:flex hidden"
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

	const itemNav = [
		{ title: "Dashboard", url: "/dashboard", icon: MdDashboard },
		{ title: "Posts", url: "/posts", icon: MdOutlineFeed },
	];

	return (
		<>
			<Sidebar collapsible="icon">
				<SidebarContent className="bg-black text-white">
					<SidebarGroup>
						<SidebarGroupLabel className="text-gray-200 text-2xl mb-5">
							Hafizu Blog
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{itemNav.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link href={item.url} className="hover:bg-white/70">
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className="bg-black text-white">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild className="hover:bg-black hover:text-white">
								<div
									onClick={() => {
										signOut();
										deleteCookies();
									}}
									className="text-white w-fit"
								>
									<LogOut /> <span>Logout</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
		</>
	);
}
