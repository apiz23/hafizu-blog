"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";

export default function Page() {
	const [links, setLinks] = useState<any>([]);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		async function fetchLinks() {
			try {
				const { data, error } = await supabase.from("link").select("*");
				setLinks(data || []);
			} catch (error: any) {
				setError(error.message);
			}
		}
		fetchLinks();
	}, []);

	// Filter video and image links
	const videoLinks = links.filter((link: any) => link.type === "video");
	const imageLinks = links.filter((link: any) => link.type === "image");
	const otherLinks = links.filter((link: any) => link.type === "other");

	return (
		<>
			{error && <p>Error: {error}</p>}
			<div className="min-h-screen w-full p-10 md:space-x-2 md:space-y-0 space-y-3 grid grid-cols-1 md:grid-cols-3 bg-white dark:bg-black">
				<div className="col-span-1 bg-white dark:bg-zinc-800 p-5 rounded-md">
					<ScrollArea className="h-[100vh] w-full rounded-md border p-4">
						{videoLinks.map((link: any) => (
							<Card
								key={link.id}
								className="dark:hover:text-black hover:bg-zinc-400 duration-500 h-fit mb-5"
							>
								<CardHeader>
									<CardTitle className="capitalize tracking-wider">
										{link.category}
									</CardTitle>
									<CardDescription className="text-gray-700">
										{link.desc}
									</CardDescription>
								</CardHeader>
								<CardContent className="p-2 col-span-1">
									<div className="relative pb-[56.25%] h-0 overflow-hidden">
										<iframe
											src={`https://www.youtube.com/embed/${getYoutubeId(link.url)}`}
											className="absolute top-0 left-0 w-[100%] h-[100%]"
											title="YouTube video player"
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											referrerPolicy="strict-origin-when-cross-origin"
											allowFullScreen
										></iframe>
									</div>
								</CardContent>
							</Card>
						))}
					</ScrollArea>
				</div>
				<div className="col-span-1 bg-white dark:bg-zinc-800 p-5 rounded-md">
					<ScrollArea className="h-[100vh] w-full rounded-md border p-4">
						{imageLinks.map((link: any) => (
							<Card
								key={link.id}
								className="dark:hover:text-black hover:bg-zinc-400  duration-500 h-fit"
							>
								<CardHeader>
									<CardTitle className="capitalize tracking-wider">
										{link.category}
									</CardTitle>
									<CardDescription className="text-gray-700">
										{link.desc}
									</CardDescription>
								</CardHeader>
								<CardContent className="p-5">
									<img src={link.url} alt="image" className="w-full" />
								</CardContent>
							</Card>
						))}
					</ScrollArea>
				</div>
				<div className="col-span-1 bg-white dark:bg-zinc-800 p-5 rounded-md">
					<ScrollArea className="h-[100vh] w-full rounded-md border p-4">
						{otherLinks.map((link: any) => (
							<Card
								key={link.id}
								className="dark:hover:text-black hover:bg-zinc-400  duration-500 h-fit"
							>
								<CardHeader>
									<CardTitle className="capitalize tracking-wider">
										{link.category}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="relative w-full rounded-md p-2.5 flex justify-between">
										{/* <Input disabled placeholder={link.url} /> */}
										{link.desc}
										<a href={link.url} target="_blank" className="hover:text-blue-600">
											<ExternalLink className="w-6 h-6" />
											{/* <button
												type="submit"
												className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
											>
												<ExternalLink className="w-4 h-4" />
												<span className="sr-only">Search</span>
											</button> */}
										</a>
									</div>
								</CardContent>
							</Card>
						))}
					</ScrollArea>
				</div>
			</div>
		</>
	);
}

function getYoutubeId(url: string) {
	const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	if (match && match[2].length === 11) {
		return match[2];
	} else {
		return "error";
	}
}
