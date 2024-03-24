"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

interface DataType {
	id: number;
	url: string;
	category: string;
	desc: string;
	created_date: Date;
}

export default function Page() {
	const [data, setData] = useState<DataType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: fetchedData, error } = await supabase
					.from("link")
					.select("*");
				if (error) {
					throw error;
				}
				setData(fetchedData || []);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<div className="min-h-screen p-5">
				<div className="max-w-4xl mx-auto">
					<h1 className="scroll-m-20 text-4xl text-center font-extrabold tracking-wider my-5 lg:text-5xl">
						Admin
					</h1>
					<div className="flex my-5 justify-end">
						<Dialog>
							<DialogTrigger className="rounded-md bg-zinc-800 p-2.5">
								<Plus className="w-5 h-5" />
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you absolutely sure?</DialogTitle>
									<DialogDescription>
										This action cannot be undone. This will permanently delete your
										account and remove your data from our servers.
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
					<Table>
						<TableCaption>List of the subject</TableCaption>
						<ScrollArea className="h-auto rounded-md border p-4">
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px]">no</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Desc</TableHead>
									<TableHead>Url</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.map((item, index) => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">
											<Dialog>
												<DialogTrigger>
													<Button variant="default">{index + 1}</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>Details</DialogTitle>
														<DialogDescription>
															Url: {item.url}
															<br />
															Category: {item.category}
															<br />
														</DialogDescription>
													</DialogHeader>
												</DialogContent>
											</Dialog>
										</TableCell>
										<TableCell>{item.category}</TableCell>
										<TableCell>{item.desc}</TableCell>
										<TableCell>{item.url}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</ScrollArea>
					</Table>
				</div>
			</div>
		</>
	);
}
