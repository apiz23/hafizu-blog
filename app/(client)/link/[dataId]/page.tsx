"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, LoaderIcon, Share } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import Image from "next/image";

export default function DataDetails({
	params,
}: {
	params: { dataId: string };
}) {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${window.location.origin}/api/link/${params.dataId}`
				);
				if (response.ok) {
					const jsonData = await response.json();
					setData(jsonData[0]);
				} else {
					console.error("Failed to fetch data:", response.statusText);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [params.dataId]);

	const copyPathToClipboard = () => {
		const path = window.location.href;
		navigator.clipboard
			.writeText(path)
			.then(() => {
				toast.success("Path copied to clipboard");
			})
			.catch((error) => {
				toast.error("Failed to copy path: ", error);
			});
	};

	const handleDownload = async (url: any) => {
		try {
			const { data } = supabase.storage.from("Documents").getPublicUrl(url);
			window.open(data.publicUrl, "_blank");
		} catch (error) {
			toast.error("Error Downloading");
		}
	};

	return (
		<>
			<div className="min-h-screen">
				<div className="max-w-xl mx-auto py-32 px-5">
					<div className="flex">
						<Link href="/link">
							<Button variant="ghost" className=" mb-5">
								<ArrowBigLeft />
							</Button>
						</Link>
					</div>
					<Card className="bg-neutral-800">
						<CardHeader>
							<div className="flex justify-between">
								<CardTitle>Link Details</CardTitle>
								<CardTitle>
									<Share
										onClick={copyPathToClipboard}
										className="hover:cursor-pointer"
									/>
								</CardTitle>
							</div>
						</CardHeader>
						<Separator className="mb-5" />
						{data ? (
							<>
								<CardContent className="font-normal text-lg">
									<div className="flow-root py-3 px-5 shadow-sm text-gray-500 dark:text-gray-100">
										<dl className="-my-3 divide-y divide-gray-100 text-sm">
											<div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
												<dt className="font-medium"> Category</dt>
												<dd className="text-gray-600 dark:text-gray-300 sm:col-span-2">
													{data.category}
												</dd>
											</div>

											<div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
												<dt className="font-medium"> Description</dt>
												<dd className="text-gray-600 dark:text-gray-300 sm:col-span-2">
													{data.desc}
												</dd>
											</div>

											<div className="grid grid-cols-1 gap-1 p-3 ">
												<dd className="text-gray-300">
													{data.url.includes("youtube.com") ||
													data.url.includes("youtu.be") ? (
														getYoutubeId(data.url) !== "error" && (
															<iframe
																width="500"
																height="415"
																src={`https://www.youtube.com/embed/${getYoutubeId(data.url)}`}
																frameBorder="0"
																allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
																allowFullScreen
																className="w-full h-72"
															/>
														)
													) : data.url.match(/\.(jpeg|jpg|gif|png)$/) !== null ? (
														<Image
															src={data.url}
															alt={data.desc}
															className="w-full object-contain"
														/>
													) : (
														<div className="flex justify-end">
															<div
																className="group relative inline-block focus:outline-none focus:ring mt-5"
																onClick={() => {
																	handleDownload(data.url);
																}}
															>
																<span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

																<span className="relative inline-block border-2 dark:border-white border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
																	Download
																</span>
															</div>
														</div>
													)}
												</dd>
											</div>
										</dl>
									</div>
								</CardContent>
							</>
						) : (
							<CardContent className="flex justify-center items-center p-14">
								<LoaderIcon className="animate-spin" />
							</CardContent>
						)}
					</Card>
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
