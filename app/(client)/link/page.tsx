"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListFilter } from "lucide-react";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";

export default function Page() {
	const [links, setLinks] = useState<any>([]);
	const [filteredLinks, setFilteredLinks] = useState<any>([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		async function fetchLinks() {
			try {
				const response = await fetch(`/api/link`);
				const data = await response.json();
				if (response.ok) {
					setLinks(data);
					setFilteredLinks(data);
				} else {
					toast.error(data.error);
				}
			} catch (error: any) {
				toast.error(error.message);
			}
		}

		fetchLinks();
	}, []);

	const handleCategoryClick = (category: string) => {
		const filtered = links.filter((link: any) => link.type === category);
		setFilteredLinks(filtered);
	};

	const handleSearch = (e: any) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = links.filter(
			(link: any) =>
				link.category.toLowerCase().includes(query) ||
				link.desc.toLowerCase().includes(query)
		);

		setFilteredLinks(filtered);
	};

	return (
		<>
			<div className="min-h-screen">
				<div className="space-x-3 py-5">
					{/* <div className="p-5 mx-3 rounded-md mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
						{Array.from(new Set(links.map((link: any) => link.type))).map(
							(linkType: any, index: any) => (
								<>
									<Card key={index} className="hidden md:block">
										<CardContent className=" hover:bg-slate-500 rounded-md hover:text-white">
											<p
												className="w-full uppercase text-lg cursor-pointer px-2.5 py-2"
												onClick={() => handleCategoryClick(linkType)}
											>
												{linkType}
											</p>
										</CardContent>
									</Card>
								</>
							)
						)}
					</div> */}

					<div className="py-5 my-10">
						<div className="max-w-3xl mx-auto">
							<div className="flex float-end">
								<input
									type="text"
									placeholder="Search links..."
									value={searchQuery}
									onChange={handleSearch}
									className="mb-4 px-4 py-2 float-end border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<Menubar className="border-none">
									<MenubarMenu>
										<MenubarTrigger>
											<ListFilter />
										</MenubarTrigger>
										<MenubarContent>
											{Array.from(new Set(links.map((link: any) => link.type))).map(
												(linkType: any, index: any) => (
													<>
														<MenubarItem
															className="font-sans text-md my-2.5 px-2.5 hover:cursor-pointer	hover:text-zinc-600"
															onClick={() => handleCategoryClick(linkType)}
															key={index}
														>
															{linkType}
														</MenubarItem>
													</>
												)
											)}
										</MenubarContent>
									</MenubarMenu>
								</Menubar>
							</div>
							<Table className="bg-zinc-90 max-w-3xl rounded-lg bg-opacity-70 backdrop-blur-md bg-teal-900 ">
								<ScrollArea className="h-[400px] rounded-md">
									<TableHeader>
										<TableRow className="bg-black dark:bg-zinc-700">
											<TableHead className="w-[100px]">Id</TableHead>
											<TableHead>Name</TableHead>
											<TableHead>Description</TableHead>
											<TableHead className="text-center">Date Created</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredLinks.map((link: any, index: any) => (
											<TableRow key={index + 1}>
												<TableCell className="font-medium">
													<Link href={`${window.location.pathname}/${link.id}`}>
														<Button variant="default">{index + 1}</Button>
													</Link>
												</TableCell>
												<TableCell>{link.category}</TableCell>
												<TableCell>{link.desc}</TableCell>
												<TableCell className="text-right">{link.created_at}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</ScrollArea>
							</Table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
