"use client";
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
import { ListFilter, LoaderIcon, RefreshCcw } from "lucide-react";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import supabase from "@/lib/supabase";

export default function Page() {
	const [links, setLinks] = useState<any>([]);
	const [filteredLinks, setFilteredLinks] = useState<any>([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		async function fetchLinks() {
			try {
				const { data: fetchedData, error } = await supabase
					.from("link")
					.select("*");
				if (error) {
					toast.error(error.message);
				}
				setLinks(fetchedData || []);
				setFilteredLinks(fetchedData || []);
			} catch (error: any) {
				toast.error(error.message);
			}
		}

		fetchLinks();
	}, []);

	console.log(links);

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
					<div className="py-5 my-20">
						<div className="max-w-3xl mx-auto">
							<div className="flex float-end">
								<input
									type="text"
									placeholder="Search links..."
									value={searchQuery}
									onChange={handleSearch}
									className="mb-4 px-4 py-2 me-3 float-end border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<RefreshCcw
									className="hover:cursor-pointer mx-5 mt-2.5"
									onClick={() => {
										window.location.reload();
									}}
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
							<Table className="max-w-3xl bg-opacity-30 backdrop-blur-lg">
								<ScrollArea className="h-[500px]">
									<TableHeader>
										<TableRow className="dark:bg-zinc-900 tracking-wider font-mono">
											<TableHead className="w-[100px]">Id</TableHead>
											<TableHead>Name</TableHead>
											<TableHead>Description</TableHead>
											<TableHead className="text-center">Date Created</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredLinks.length === 0 ? (
											<TableRow>
												<TableCell colSpan={4} className="text-center">
													<LoaderIcon className="animate-spin mx-auto " />
												</TableCell>
											</TableRow>
										) : (
											filteredLinks.map((link: any, index: any) => (
												<TableRow key={index + 1}>
													<TableCell className="font-medium">
														<Link href={`${window.location.pathname}/${link.id}`}>
															<Button variant="default">{index + 1}</Button>
														</Link>
													</TableCell>
													<TableCell>{link.category}</TableCell>
													<TableCell>{link.desc}</TableCell>
													<TableCell className="text-center">
														{new Date(link.created_at).toLocaleDateString()}
													</TableCell>
												</TableRow>
											))
										)}
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
