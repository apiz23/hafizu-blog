"use client";

import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	ArrowBigLeft,
	ArrowLeft,
	ExternalLink,
	LoaderIcon,
	Share,
	TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DataDetails({
	params,
}: {
	params: { dataId: string };
}) {
	const [data, setData] = useState<any>(null);
	const router = useRouter();

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

	const handleDelete = async () => {
		try {
			const response = await fetch(
				`${window.location.origin}/api/link/${params.dataId}`,
				{
					method: "DELETE",
				}
			);
			if (response.ok) {
				router.push("/dashboard");
			} else {
				toast.error("Failed to delete link");
			}
		} catch (error: any) {
			toast.error("Error deleting link:", error);
		}
	};

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
	return (
		<>
			<div className="min-h-screen">
				<div className="max-w-xl mx-auto py-10 px-5">
					<div className="flex">
						<Link href="/link">
							<Button variant="ghost" className=" mb-5">
								<ArrowBigLeft />
							</Button>
						</Link>
					</div>
					<Card>
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
								<CardContent className="font-normal text-lg ">
									<p className="text-gray-500 whitespace-nowrap dark:text-gray-400">
										ID: {data.id}
									</p>
									<p className="text-gray-500 whitespace-nowrap dark:text-gray-400">
										Category: {data.category}
									</p>
									<p className="text-gray-500 overflow-hidden dark:text-gray-400">
										URL:{" "}
										<Link
											href={data.url}
											target="_blank"
											className="hover:text-blue-400 truncate"
											rel="noreferrer"
										>
											{data.url}
										</Link>
									</p>
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
