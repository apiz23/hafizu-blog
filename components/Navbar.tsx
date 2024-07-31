"use client";

import {
	Home,
	LucideLink,
	Lock,
	Menu,
	Calculator,
	MessageSquare,
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

import Footer from "./footer";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();

	const itemNav = [
		{ title: "Home", url: "/", icon: Home },
		{ title: "Feed", url: "/feed", icon: MessageSquare },
		{ title: "Link", url: "/link", icon: LucideLink },
		{ title: "Calculator", url: "/calculator", icon: Calculator },
		{ title: "Admin", url: "/login", icon: Lock },
	];
	return (
		<>
			<nav className="bg-black bg-opacity-50 w-fit rounded-md md:mx-auto">
				<div className="max-w-screen-sm mt-5 flex mx-auto p-4">
					<div className="block md:hidden flex-col h-full">
						<Sheet>
							<SheetTrigger>
								<Menu className="hover:text-zinc-500" />
							</SheetTrigger>
							<SheetContent
								side="left"
								className="flex flex-col justify-between h-full w-2/3"
							>
								<SheetHeader>
									<SheetTitle className="flex">
										<span className="text-2xl px-5 flex font-semibold whitespace-nowrap dark:text-white text-black">
											Hafizu Blog
										</span>
									</SheetTitle>
								</SheetHeader>
								<div className="block">
									{itemNav.map((item, index) => (
										<SheetClose asChild key={index}>
											<Link href={item.url} passHref>
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
														: "text-gray-700 dark:text-gray-300 hover:block hidden"
												}`}
											>
												{item.title}
											</p>
										</NavigationMenuLink>
									))}
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>
			</nav>
		</>
	);
}
