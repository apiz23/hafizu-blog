"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

	return (
		<>
			{error && <p>Error: {error}</p>}
			<div className="min-h-screen w-full p-10 md:space-x-2 md:space-y-0 space-y-3 grid grid-cols-1 md:grid-cols-3 bg-white dark:bg-black">
				{links.map((link: any) => (
					<Card
						key={link.id}
						className="dark:hover:text-black hover:bg-zinc-400  duration-500 h-fit"
					>
						<CardHeader>
							<CardTitle className="capitalize tracking-wider">
								{link.category}
							</CardTitle>
							<CardDescription className="text-gray-700">{link.desc}</CardDescription>
						</CardHeader>

						<CardContent className="p-5">
							<div className="relative pb-[56.25%] h-0 overflow-hidden">
								<iframe
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										height: "100%",
									}}
									src={`https://www.youtube.com/embed/${getYoutubeId(link.url)}`}
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
			</div>
		</>
	);
}

// // Function to extract YouTube video ID from URL
function getYoutubeId(url: string) {
	const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	if (match && match[2].length === 11) {
		return match[2];
	} else {
		return "error";
	}
}
