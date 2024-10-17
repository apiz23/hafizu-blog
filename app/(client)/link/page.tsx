"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderIcon, RefreshCcw } from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { useQuery } from "react-query";

async function fetchLinks() {
	const response = await fetch(`${window.location.origin}/api/link`);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch links");
	}

	const data = await response.json();
	return data.sort((a: any, b: any) => b.id - a.id);
}

export default function Page() {
	const { data: links = [], error } = useQuery(["links"], fetchLinks, {
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
			<div className="pb-20">
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
								className="mb-4 px-4 py-2 w-full me-3 float-end border bg-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="col-span-6 flex justify-end">
							<div
								className="inline-flex rounded-md shadow-sm pb-2 hover:cursor-pointer"
								role="group"
							>
								<button
									type="button"
									className="px-5 py-1 text-sm font-medium border rounded-lg hover:text-blue-700 focus:z-10 focus:ring-2 bg-gray-800 border-gray-700text-whitehover:text-white hover:bg-gray-700 focus:ring-blue-500 focus:text-white"
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
							<LoaderIcon className="animate-spin mx-auto pt-10" />
						) : (
							<HoverEffect
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-2"
								items={filteredLinks}
							/>
						)}
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
