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
import Link from "next/link";
import { MdDashboard, MdOutlineFeed } from "react-icons/md";

export function AppSidebar() {
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
		</Sidebar>
	);
}
