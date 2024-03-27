"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./themeBtn";

export default function Navbar() {
	const itemNav = [
		{ title: "Home", url: "/" },
		{ title: "Link", url: "/link" },
		{ title: "Admin", url: "/login" },
	];

	return (
		<>
			<nav className="bg-white dark:bg-black border-b-2">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2.5">
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>
								<MenuIcon />
							</MenubarTrigger>
							<MenubarContent className="p-4">
								<ModeToggle />
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
					{/* <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
						image
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Flowbite
						</span>
					</a> */}
					{/* <button
						data-collapse-toggle="navbar-default"
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						<MenuIcon />
					</button> */}
					{/* <div className="hidden w-full md:block md:w-auto" id="navbar-default">
						<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<Link
									href="/"
									className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
								>
									Home
								</Link>
							</li>
						</ul>
					</div> */}
				</div>
			</nav>
		</>
	);
}
