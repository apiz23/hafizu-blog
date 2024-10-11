"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, LoaderIcon, Share } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Image from "next/image";
import { useQuery } from "react-query";
import supabase from "@/lib/supabase";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

function getYoutubeId(url: string) {
	const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	if (match && match[2].length === 11) {
		return match[2];
	} else {
		return "error";
	}
}

async function fetchData(dataId: string) {
	const response = await fetch(`${window.location.origin}/api/link/${dataId}`);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	const jsonData = await response.json();
	return jsonData[0];
}

export default function DataDetails({
	params,
}: {
	params: { dataId: string };
}) {
	const { data, isLoading, error } = useQuery(
		["data", params.dataId],
		() => fetchData(params.dataId),
		{
			staleTime: 300000,
			cacheTime: 600000,
		}
	);

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

	if (isLoading) {
		return (
			<CardContent className="min-h-screen flex justify-center items-center p-14">
				<LoaderIcon className="animate-spin" />
			</CardContent>
		);
	}

	if (error) {
		toast.error((error as Error).message);
		return null;
	}

	return (
		<div className="min-h-screen">
			<div className="max-w-xl mx-auto py-32 px-5">
				<div className="py-5">
					<Link href="/link">
						<Button variant="outline" className="mb-5 bg-neutral-100/60">
							<ArrowBigLeft />
						</Button>
					</Link>
				</div>
				<Card className="bg-neutral-800">
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle className="text-white">Link Details</CardTitle>
							<CardTitle>
								<Share
									onClick={copyPathToClipboard}
									className="text-white hover:cursor-pointer"
								/>
							</CardTitle>
						</div>
					</CardHeader>
					<Separator className="mb-5" />
					{data ? (
						<CardContent className="font-normal text-lg">
							<div className="flow-root py-3 shadow-sm text-gray-100">
								<dl className="-my-3 divide-y divide-gray-100 text-sm">
									<div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
										<dt className="font-medium">Category</dt>
										<dd className="text-gray-600text-gray-300 sm:col-span-2">
											{data.category}
										</dd>
									</div>

									<div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
										<dt className="font-medium">Description</dt>
										<dd className=" text-gray-300 sm:col-span-2">{data.desc}</dd>
									</div>

									<div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
										<dt className="font-medium">Data Type</dt>
										<dd className=" text-gray-300 sm:col-span-2">{data.type}</dd>
									</div>

									<div className="pt-3">
										<dd className="text-gray-300">
											{(() => {
												const isYouTube =
													data.url.includes("youtube.com") || data.url.includes("youtu.be");
												const isImage = data.type === "image";

												if (isYouTube) {
													const youtubeId = getYoutubeId(data.url);
													return youtubeId ? (
														<iframe
															width="500"
															height="415"
															src={`https://www.youtube.com/embed/${youtubeId}`}
															frameBorder="0"
															allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
															allowFullScreen
															className="w-full h-72"
															title="YouTube Video"
														/>
													) : (
														<p className="text-red-500">Invalid YouTube URL</p>
													);
												} else if (isImage) {
													const baseUrl =
														"https://ykzglhnkmwqyekcvutgx.supabase.co/storage/v1/object/public/Documents/";
													const fullUrl = `${baseUrl}${data.url}`;

													return (
														<>
															<Dialog>
																<DialogTrigger className="flex justify-center">
																	<Image
																		src={fullUrl}
																		alt={data.desc || "Image preview"}
																		className="h-72 object-contain shadow-md hover:cursor-pointer"
																		width={500}
																		height={500}
																		loading="lazy"
																	/>
																</DialogTrigger>
																<DialogContent className="bg-transparent border-none text-white">
																	<div className="flex justify-center">
																		<Image
																			src={fullUrl}
																			alt={data.desc || "Image preview"}
																			className="w-full object-contain rounded shadow-md"
																			width={500}
																			height={500}
																			loading="lazy"
																		/>
																	</div>
																</DialogContent>
															</Dialog>
														</>
													);
												} else {
													return (
														<div className="flex justify-end">
															<div
																className="group relative inline-block focus:outline-none focus:ring mt-5"
																onClick={() => {
																	handleDownload(data.url);
																}}
															>
																<span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
																<span className="relative inline-block border-2 border-white border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
																	Download
																</span>
															</div>
														</div>
													);
												}
											})()}
										</dd>
									</div>
								</dl>
							</div>
						</CardContent>
					) : null}
				</Card>
			</div>
		</div>
	);
}
