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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { ArrowBigLeft, Plus, RefreshCcw, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

interface DataType {
	id: number;
	url: string;
	category: string;
	desc: string;
	created_at: string;
}

export default function Page() {
	const [data, setData] = useState<DataType[]>([]);
	const [formData, setFormData] = useState({
		url: "",
		desc: "",
		category: "",
		type: "",
	});

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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[id]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.url || !formData.desc || !formData.category || !formData.type) {
			toast.error("Please fill all the form fields");
			return;
		}
		try {
			const { data: insertedData, error } = await supabase
				.from("link")
				.insert([formData]);
			if (error) {
				toast.error("Error");
			}
			const promise = () =>
				new Promise((resolve) =>
					setTimeout(() => resolve({ name: "Sonner" }), 2000)
				);

			toast.promise(promise, {
				loading: "Loading...",
				success: () => {
					return "Data inserted successfully";
				},
				error: "Error",
			});
			setFormData({
				url: "",
				desc: "",
				category: "",
				type: "",
			});
		} catch (error: any) {
			toast.error("Error inserting data:", error.message);
		}
	};

	const handleDelete = async (idToDelete: number) => {
		try {
			const { error } = await supabase.from("link").delete().eq("id", 10);

			if (error) {
				toast.error("Error");
			}
			const promise = () =>
				new Promise((resolve) =>
					setTimeout(() => resolve({ name: "Sonner" }), 2000)
				);

			toast.promise(promise, {
				loading: "Loading...",
				success: () => {
					return "Data delete successfully";
				},
				error: "Error",
			});
		} catch (error: any) {
			toast.error("Error deleting data:", error.message);
		}
	};

	return (
		<>
			<div className="min-h-screen p-5">
				<div className="flex">
					<Link href="/login">
						<Button variant="ghost" className="m-3">
							<ArrowBigLeft />
						</Button>
					</Link>
				</div>
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
								<DialogHeader className="text-3xl font-medium tracking-wide">
									Add Data
								</DialogHeader>
								<form onSubmit={handleSubmit}>
									<Input
										className="mb-5"
										type="text"
										placeholder="Url"
										id="url"
										value={formData.url}
										onChange={handleChange}
									/>
									<Input
										className="mb-5"
										type="text"
										placeholder="Description"
										id="desc"
										value={formData.desc}
										onChange={handleChange}
									/>
									<Input
										className="mb-5"
										type="text"
										placeholder="Category"
										id="category"
										value={formData.category}
										onChange={handleChange}
									/>
									<select
										id="type"
										className="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										value={formData.type}
										onChange={handleChange}
									>
										<option value="">Type</option>
										<option value="video">video</option>
										<option value="image">image</option>
										<option value="other">other</option>
									</select>
									<div className="flex justify-end mt-5">
										<Button variant="default">Submit</Button>
									</div>
								</form>
							</DialogContent>
						</Dialog>
					</div>
					<Table>
						<TableCaption>List of the subject</TableCaption>
						<ScrollArea className="h-auto rounded-md border p-4">
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px]">No</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Desc</TableHead>
									<TableHead>Created Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.map((item, index) => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">
											{/* <Dialog>
												<DialogTrigger>
													<Button variant="default">{index + 1}</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>Details</DialogTitle>
														<DialogDescription className="pt-5 text-left">
															<p>Url: {item.id}</p>
															<br />
															<p>Category: {item.category}</p>
															<br />
															<div className="flex justify-end">
																<Button onClick={() => handleDelete(item.id)}>
																	<Trash className="w-5 h-5" />
																</Button>
															</div>
														</DialogDescription>
													</DialogHeader>
												</DialogContent>
											</Dialog> */}
											<Link href={`${window.location.pathname}/${item.id}`}>
												<Button variant="default">{index + 1}</Button>
											</Link>
										</TableCell>
										<TableCell>{item.category}</TableCell>
										<TableCell>{item.desc}</TableCell>
										<TableCell>{item.created_at}</TableCell>
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
