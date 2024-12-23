import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, MessageSquare, Image, Calculator, Lock } from "lucide-react";
import Link from "next/link";
import { FaRegFile } from "react-icons/fa";

export function AppSidebar() {
	const itemNav = [
		{ title: "Home", url: "/", icon: Home },
		// { title: "Feed", url: "/feed", icon: MessageSquare },
		{ title: "UTHM Photo Finder", url: "/uthmPhotoFinder", icon: Image },
		{ title: "Link", url: "/link", icon: FaRegFile },
		{ title: "Calculator", url: "/calculator", icon: Calculator },
		{ title: "Admin", url: "/login", icon: Lock },
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
		</Sidebar>
	);
}
