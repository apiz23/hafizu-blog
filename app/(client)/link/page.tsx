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
import { LayoutGrid, List, LoaderIcon, RefreshCcw } from "lucide-react";
import supabase from "@/lib/supabase";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Page() {
	const [links, setLinks] = useState<any>([]);
	const [filteredLinks, setFilteredLinks] = useState<any>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [viewMode, setViewMode] = useState("table");

	useEffect(() => {
		async function fetchLinks() {
			try {
				const { data: fetchedData, error } = await supabase
					.from("link")
					.select("*")
					.order("created_at", { ascending: false });
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

	const handleViewModeToggle = (mode: any) => {
		setViewMode(mode);
	};
	return (
		<>
			<div className="min-h-screen bg-neutral-900">
				<div className="space-x-3 py-10">
					<div className="py-5 my-20">
						<div className="max-w-4xl mx-auto">
							<div className="grid grid-cols-1 md:grid-cols-5 mb-5 space-x-3 px-2 mx-5">
								<div className="col-span-3 flex justify-end">
									<input
										type="text"
										placeholder="Search links..."
										value={searchQuery}
										onChange={handleSearch}
										className="mb-4 px-4 py-2 w-full me-3 float-end border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								<div className="col-span-2 flex justify-end">
									<div
										className="inline-flex rounded-md shadow-sm pb-2 hover:cursor-pointer"
										role="group"
									>
										<button
											type="button"
											className="px-5 py-1 text-sm font-medium me-2 text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
											onClick={() => {
												window.location.reload();
											}}
										>
											<RefreshCcw />
										</button>
										<button
											onClick={() => handleViewModeToggle("table")}
											className={`px-5 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${
												viewMode === "table" ? "bg-gray-800" : "bg-gray-500"
											}`}
										>
											<LayoutGrid />
										</button>
										<button
											onClick={() => handleViewModeToggle("card")}
											className={`px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white${
												viewMode === "card" ? "bg-gray-800" : "bg-gray-500"
											}`}
										>
											<List />
										</button>
									</div>
								</div>
							</div>
							{viewMode === "table" ? (
								<ScrollArea className="h-[560px]">
									{filteredLinks.length === 0 ? (
										<LoaderIcon className="animate-spin mx-auto" />
									) : (
										<HoverEffect items={filteredLinks} />
									)}
								</ScrollArea>
							) : filteredLinks.length === 0 ? (
								<LoaderIcon className="animate-spin mx-auto" />
							) : (
								<ScrollArea className="h-[550px]">
									<Table className="max-w-4xl bg-opacity-30 backdrop-blur-lg mx-2.5">
										<TableHeader>
											<TableRow className="bg-zinc-200 dark:bg-zinc-900 tracking-wider font-mono">
												<TableHead className="w-[60px]">No</TableHead>
												<TableHead>Name</TableHead>
												<TableHead>Description</TableHead>
												<TableHead className="text-center">Date Created</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredLinks.length === 0 ? (
												<TableRow>
													<TableCell colSpan={4} className="text-center">
														<LoaderIcon className="animate-spin mx-auto" />
													</TableCell>
												</TableRow>
											) : (
												filteredLinks.map((link: any, index: any) => (
													<TableRow key={index + 1} className="capitalize">
														<TableCell className="font-medium">
															<Link href={`${window.location.pathname}/${link.id}`}>
																<Button variant="default" className="rounded-full">
																	{index + 1}
																</Button>
															</Link>
														</TableCell>
														<TableCell>{link.category}</TableCell>
														<TableCell>{link.desc}</TableCell>
														<TableCell className="text-center">
															{new Date(link.created_at).toLocaleDateString("en-GB")}
														</TableCell>
													</TableRow>
												))
											)}
										</TableBody>
									</Table>
								</ScrollArea>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
