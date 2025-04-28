"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MdDashboard, MdOutlineFeed } from "react-icons/md";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User2, ChevronUp, LogOut } from "lucide-react";
import { deleteCookies } from "@/lib/auth";

export function AppSidebar() {
	const { data: session } = useSession();

	if (session && session.user && session.user.email) {
		sessionStorage.setItem("user-email", session.user.email);
	}

	const itemNav = [
		{ title: "Dashboard", url: "/dashboard", icon: MdDashboard },
		{ title: "Posts", url: "/posts", icon: MdOutlineFeed },
	];

	return (
		<Sidebar className="border-none">
			<SidebarHeader className="bg-neutral-900">
				<SidebarGroupLabel className="text-2xl text-neutral-200">
					Hafizu Blog
				</SidebarGroupLabel>
			</SidebarHeader>
			<SidebarContent className="bg-neutral-900  text-neutral-400">
				<SidebarGroup>
					<SidebarGroupLabel className="text-neutral-500">Menus</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{itemNav.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild className="hover:rounded">
										<Link href={item.url} className="flex items-center gap-2">
											<item.icon className="w-5 h-5" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter className="bg-neutral-900">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger
								asChild
								className="hover:bg-transparent hover:text-white"
							>
								<SidebarMenuButton>
									<User2 /> Username
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem
									onClick={() => {
										signOut();
										deleteCookies();
									}}
									className="gap-5"
								>
									<span>Log Out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
