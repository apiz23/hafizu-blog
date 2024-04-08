"use client";

import { MenuIcon, Home, LucideLink, Lock } from "lucide-react";
import Link from "next/link";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./themeBtn";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import Footer from "./footer";

export default function Navbar() {
	const itemNav = [
		{ title: "Home", url: "/", icon: Home },
		{ title: "Link", url: "/link", icon: LucideLink },
		{ title: "Admin", url: "/login", icon: Lock },
	];
	return (
		<>
			<nav className="bg-white dark:bg-black border-b-2 md:hidden">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2.5">
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>
								<MenuIcon />
							</MenubarTrigger>
							<MenubarContent className="p-4">
								<div className="flex space-x-5">
									<Label>Theme</Label>
									<ModeToggle />
								</div>
								{itemNav.map((item) => (
									<div key={item.title}>
										<Link href={item.url}>
											<MenubarItem>{item.title}</MenubarItem>
										</Link>
									</div>
								))}
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
					<img src="/logo.png" alt="logo" className="w-8 h-8" />
				</div>
			</nav>
			<aside className="w-80 min-h-screen bg-white dark:bg-black transition-transform -translate-x-full sm:translate-x-0 md:block hidden shadow-md shadow-gray-500">
				<div className="pt-10">
					<div className="flex justify-between pe-5 mb-10">
						<span className="text-2xl px-5 font-semibold whitespace-nowrap dark:text-white text-black">
							Hafizu Blog
						</span>
						<img src="/logo.png" alt="logo" className="w-8 h-8" />
					</div>
					<Separator />
					<div className="flex ps-10 pt-10">
						<ModeToggle />
					</div>
					{itemNav.map((item) => (
						<div
							key={item.title}
							className="p-5 border bg-white dark:bg-black border-black dark:border-white rounded-md my-5 mx-5 dark:hover:bg-slate-800 hover:bg-slate-200"
						>
							<Link
								href={item.url}
								className="flex space-x-5 text-black dark:text-white"
							>
								<item.icon />
								<p>{item.title}</p>
							</Link>
						</div>
					))}
				</div>
				<Footer />
			</aside>
		</>
	);
}
