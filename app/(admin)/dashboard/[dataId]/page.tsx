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
	return (
		<>
			<div className="max-w-xl mx-auto py-10 px-5 my-10">
				<div className="flex mb-5">
					<Link href="/dashboard">
						<Button variant="ghost" className="text-white">
							<ArrowLeft />
						</Button>
					</Link>
				</div>
				<Card>
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle>Link Details</CardTitle>
							<CardTitle>
								<Share />
							</CardTitle>
						</div>
					</CardHeader>
					<Separator className="mb-5" />
					{data ? (
						<>
							<CardContent className="font-normal text-lg">
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
							<CardFooter className="flex justify-end">
								<Button variant="destructive" onClick={handleDelete}>
									<TrashIcon className="w-5 h-5" />
								</Button>
							</CardFooter>
						</>
					) : (
						<CardContent className="flex justify-center items-center p-14">
							<LoaderIcon className="animate-spin" />
						</CardContent>
					)}
				</Card>
			</div>
		</>
	);
}
