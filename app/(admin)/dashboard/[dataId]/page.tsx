"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LoaderIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "react-query";

async function fetchData(dataId: string) {
	const response = await fetch(`/api/link/${dataId}`);
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

	const router = useRouter();

	const handleDelete = async () => {
		try {
			const response = await fetch(`/api/link/${params.dataId}`, {
				method: "DELETE",
			});
			if (response.ok) {
				router.push("/dashboard");
			} else {
				toast.error("Failed to delete link");
			}
		} catch (error: any) {
			toast.error(`Error deleting link: ${error.message}`);
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
		toast.error(`Error fetching data: ${(error as Error).message}`);
		return null;
	}

	return (
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
				) : null}
			</Card>
		</div>
	);
}
