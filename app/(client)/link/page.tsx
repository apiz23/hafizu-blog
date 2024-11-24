"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderIcon, RefreshCcw } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { useQuery, useQueryClient } from "react-query";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

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
		staleTime: 0,
		cacheTime: 600000,
		refetchOnWindowFocus: true,
	});

	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();

	const handleSearch = (e: any) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		setCurrentPage(1);
	};

	const filteredLinks = links.filter(
		(link: any) =>
			link.category.toLowerCase().includes(searchQuery) ||
			link.desc.toLowerCase().includes(searchQuery)
	);

	const totalPages = Math.ceil(filteredLinks.length / ITEMS_PER_PAGE);

	const paginatedLinks = filteredLinks.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	if (error) {
		toast.error((error as Error).message);
	}

	return (
		<div className="min-h-screen space-x-3 px-5">
			<div className="pb-32 pt-14 md:pt-24">
				<GradualSpacing
					className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl mb-14"
					text="File Link"
				/>
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-12 mb-10 space-x-3 px-2">
						<div className="col-span-6 flex justify-end">
							<Input
								type="text"
								placeholder="Search links..."
								value={searchQuery}
								onChange={handleSearch}
								className="mb-4 px-4 py-2 w-full me-3 float-end border bg-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						{/* <div className="col-span-6 flex justify-end">
							<div
								className="inline-flex rounded-md shadow-sm pb-2 hover:cursor-pointer"
								role="group"
							>
								<button
									type="button"
									className="px-5 py-1 text-sm font-medium border rounded-lg hover:text-blue-700 focus:z-10 focus:ring-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700 focus:ring-blue-500"
									onClick={() => queryClient.invalidateQueries("links")}
								>
									<RefreshCcw />
								</button>
							</div>
						</div> */}
					</div>
					<ScrollArea className="h-[50vh] md:h-fit">
						{filteredLinks.length === 0 ? (
							<LoaderIcon className="animate-spin mx-auto pt-10" />
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{paginatedLinks.map((link: any) => (
									<Link href={`/link/${link.id}`} key={link.id}>
										<Card className="h-full bg-gray-950 hover:bg-gray-800 text-white border rounded-xl">
											<CardHeader>
												<CardTitle className="capitalize">{link.category}</CardTitle>
												<CardDescription>{link.desc}</CardDescription>
											</CardHeader>
											<CardContent className="flex justify-end">
												<p>{link.type}</p>
											</CardContent>
										</Card>
									</Link>
								))}
							</div>
						)}
					</ScrollArea>
					<Pagination className="flex justify-center my-5 space-x-4">
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href="#" onClick={handlePreviousPage} />
							</PaginationItem>
							{Array.from({ length: totalPages }, (_, index) => (
								<PaginationItem key={index}>
									<PaginationLink href="#" onClick={() => setCurrentPage(index + 1)}>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							{totalPages > 5 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							<PaginationItem>
								<PaginationNext href="#" onClick={handleNextPage} />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
}
