"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutGrid, List, LoaderIcon, RefreshCcw } from "lucide-react";
import supabase from "@/lib/supabase";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { useQuery } from "react-query";

async function fetchLinks() {
	const { data, error } = await supabase
		.from("link")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export default function Page() {
	const {
		data: links = [],
		error,
		isLoading,
		refetch,
	} = useQuery(["links"], fetchLinks, {
		staleTime: 300000,
		cacheTime: 600000,
	});
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: any) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
	};

	const filteredLinks = links.filter(
		(link: any) =>
			link.category.toLowerCase().includes(searchQuery) ||
			link.desc.toLowerCase().includes(searchQuery)
	);

	if (error) {
		toast.error((error as Error).message);
	}
	return (
		<div className="min-h-screen space-x-3 px-5 pt-24">
			<div className="py-5">
				<GradualSpacing
					className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl mb-14"
					text="File Link"
				/>
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-12 mb-5 space-x-3 px-2 mx-5">
						<div className="col-span-6 flex justify-end">
							<input
								type="text"
								placeholder="Search links..."
								value={searchQuery}
								onChange={handleSearch}
								className="mb-4 px-4 py-2 w-full me-3 float-end border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="col-span-6 flex justify-end">
							<div
								className="inline-flex rounded-md shadow-sm pb-2 hover:cursor-pointer"
								role="group"
							>
								<button
									type="button"
									className="px-5 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
									onClick={() => {
										window.location.reload();
									}}
								>
									<RefreshCcw />
								</button>
							</div>
						</div>
					</div>

					<ScrollArea className="h-[50vh] md:h-[560px]">
						{filteredLinks.length === 0 ? (
							<LoaderIcon className="animate-spin mx-auto" />
						) : (
							<HoverEffect
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
								items={filteredLinks}
							/>
						)}
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
