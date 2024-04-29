"use client";

import { MenuIcon, Home, LucideLink, Lock, Menu } from "lucide-react";
import Link from "next/link";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from "./themeBtn";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import Footer from "./footer";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();

	const itemNav = [
		{ title: "Home", url: "/", icon: Home },
		{ title: "Link", url: "/link", icon: LucideLink },
		{ title: "Admin", url: "/login", icon: Lock },
	];
	return (
		<>
			<nav className="bg-transparent">
				<div className="max-w-screen-sm rounded-3xl mt-5 md:bg-neutral-200 md:dark:bg-neutral-800 flex mx-auto p-4">
					<div className="block md:hidden flex-col h-full">
						<Sheet>
							<SheetTrigger>
								<Menu className="hover:text-zinc-500" />
							</SheetTrigger>
							<SheetContent
								side="left"
								className="flex flex-col justify-between h-full"
							>
								<SheetHeader>
									<SheetTitle className="flex">
										<span className="text-2xl px-5 flex font-semibold whitespace-nowrap dark:text-white text-black">
											Hafizu Blog
											<img src="/logo.png" alt="logo" className="w-8 h-8 ms-5 mt-1" />
										</span>
									</SheetTitle>
									<div className="mx-auto">
										<ModeToggle />
									</div>
								</SheetHeader>
								<div className="block my-10">
									{itemNav.map((item, index) => (
										<Link key={index} href={item.url}>
											<div
												key={item.title}
												className={`p-5 border bg-white dark:bg-black flex space-x-3 text-black dark:text-white border-black dark:border-white rounded-md my-5 mx-5 dark:hover:bg-slate-800 hover:bg-slate-200 ${
													pathname === item.url ? "text-yellow-500" : ""
												}`}
											>
												<item.icon
													className={
														pathname === item.url ? "h-5 w-5 text-yellow-500" : "h-5 w-5"
													}
												/>
												<p
													className={
														pathname === item.url ? "h-5 w-5 text-yellow-500" : "h-5 w-5"
													}
												>
													{item.title}
												</p>
											</div>
										</Link>
									))}
								</div>
								<Footer />
							</SheetContent>
						</Sheet>
					</div>

					<div className="hidden w-full md:block md:w-auto mx-auto">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem className="flex w-full ">
									{itemNav.map((item, index) => (
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
														: "text-gray-700 dark:text-gray-300"
												}`}
											>
												{item.title}
											</p>
										</NavigationMenuLink>
									))}
									<ModeToggle />
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>
			</nav>

			{/* <nav className="bg-white dark:bg-black border-b-2 md:hidden">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2.5">
					<Sheet>
						<SheetTrigger>
							<Menu className="hover:text-zinc-500" />
						</SheetTrigger>
						<SheetContent side="left">
							<SheetHeader>
								<SheetTitle className="flex">
									<span className="text-2xl px-5 flex font-semibold whitespace-nowrap dark:text-white text-black">
										Hafizu Blog
										<img src="/logo.png" alt="logo" className="w-8 h-8 ms-5 mt-1" />
									</span>
								</SheetTitle>
								<div className="mx-auto">
									<ModeToggle />
								</div>
							</SheetHeader>
							<div className="block my-10">
								{itemNav.map((item, index) => (
									<Link key={index} href={item.url}>
										<div
											key={item.title}
											className="p-5 border bg-white dark:bg-black flex space-x-5 text-black dark:text-white border-black dark:border-white rounded-md my-5 mx-5 dark:hover:bg-slate-800 hover:bg-slate-200"
										>
											<item.icon />
											<p>{item.title}</p>
										</div>
									</Link>
								))}
							</div>
							<Footer />
						</SheetContent>
					</Sheet>
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
						<ModeToggle />
					</div>
					<Separator />

					{itemNav.map((item, index) => (
						<Link key={index} href={item.url}>
							<div
								key={item.title}
								className="p-5 border bg-white dark:bg-black dark:bg-blac flex space-x-5 text-black dark:text-white border-black dark:border-white rounded-md my-5 mx-5 dark:hover:bg-slate-800 hover:bg-slate-200"
							>
								<item.icon />
								<p>{item.title}</p>
							</div>
						</Link>
					))}
				</div>
				<Footer />
			</aside> */}
		</>
	);
}
