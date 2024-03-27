"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, LoaderIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function Page() {
	const [links, setLinks] = useState<any>([]);

	useEffect(() => {
		async function fetchLinks() {
			try {
				const response = await fetch(`/api/link`);
				const data = await response.json();

				if (response.ok) {
					setLinks(data);
				} else {
					toast.error(data.error);
				}
			} catch (error: any) {
				toast.error(error.message);
			}
		}

		fetchLinks();
	}, []);

	const videoLinks = links.filter((link: any) => link.type === "video");
	const imageLinks = links.filter((link: any) => link.type === "image");
	const otherLinks = links.filter((link: any) => link.type === "other");

	return (
		<>
			<div className="h-[100vh]">
				<div className="grid grid-cols-3"></div>
				<div className="md:p-5 md:space-y-0 space-y-3 grid grid-cols-1 md:grid-cols-3 bg-white dark:bg-black">
					<div className="col-span-1 p-2.5 rounded-md">
						<ScrollArea className="h-[80vh] w-full p-4">
							{videoLinks.map((link: any) => (
								<Card
									key={link.id}
									className="dark:hover:text-black border m-3 mb-5 px-2 hover:bg-zinc-500 duration-500 h-fit"
								>
									<CardHeader>
										<CardTitle className="capitalize tracking-wider">
											{link.desc}
										</CardTitle>
										<CardDescription className="text-gray-700">
											{link.category}
										</CardDescription>
									</CardHeader>
									<CardContent className="p-2 col-span-1">
										<Dialog>
											<DialogTrigger className="w-full hover:bg-slate-800 hover:text-emerald-200 border-2 rounded-md">
												Open
											</DialogTrigger>
											<DialogContent>
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
											</DialogContent>
										</Dialog>
									</CardContent>
								</Card>
							))}
						</ScrollArea>
					</div>
					<Separator className="md:hidden" />
					<div className="col-span-1 p-2.5 rounded-md">
						<ScrollArea className="h-[80vh] w-full p-4">
							{imageLinks.map((link: any) => (
								<Card
									key={link.id}
									className="dark:hover:text-black border m-3 mb-5 px-2 hover:bg-zinc-500 duration-500 h-fit"
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
										<Dialog>
											<DialogTrigger className="w-full hover:bg-slate-800 hover:text-emerald-200 border-2 rounded-md">
												Open
											</DialogTrigger>
											<DialogContent>
												<img src={link.url} alt="image" className="w-full" />
											</DialogContent>
										</Dialog>
									</CardContent>
								</Card>
							))}
						</ScrollArea>
					</div>
					<Separator className="md:hidden" />
					<div className="col-span-1 p-2.5 rounded-md">
						<ScrollArea className="h-[80vh] w-full p-4">
							{otherLinks.map((link: any) => (
								<Card
									key={link.id}
									className="dark:hover:text-black border m-3 mb-5 px-2 hover:bg-zinc-500 duration-500 h-fit"
								>
									<CardHeader>
										<CardTitle className="capitalize tracking-wider">
											{link.category}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="relative w-full rounded-md p-2.5 flex justify-between">
											{link.desc}
											<a href={link.url} target="_blank" className="hover:text-blue-600">
												<ExternalLink className="w-6 h-6" />
											</a>
										</div>
									</CardContent>
								</Card>
							))}
						</ScrollArea>
					</div>
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
