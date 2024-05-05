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
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ArrowBigLeft, Plus, CloudUpload, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { deleteCookies } from "@/lib/auth";
interface DataType {
	id: number;
	url: string;
	category: string;
	desc: string;
	created_at: string;
}

export default function Page() {
	const [data, setData] = useState<DataType[]>([]);
	const [isFileInput, setIsFileInput] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [formData, setFormData] = useState({
		url: "",
		desc: "",
		category: "",
		type: "",
	});
	const { data: session, status } = useSession();
	useEffect(() => {
		if (!session && status === "loading") {
			redirect("/login");
		} else {
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
		}
	}, [session, status]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[id]: value,
		}));
	};

	const handleChangeFile = () => {
		setIsFileInput(!isFileInput);
		setSelectedFile(null);
		setFormData((prevData) => ({ ...prevData, url: "" }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!(formData.url || selectedFile) ||
			!formData.desc ||
			!formData.category ||
			!formData.type
		) {
			toast.error("Please fill all the required form fields");
			return;
		}
		try {
			let fileUrl = "";

			if (selectedFile) {
				const uniqueId = uuidv4();
				const { data: fileData, error: fileError } = await supabase.storage
					.from("Documents")
					.upload(uniqueId, selectedFile);
				if (fileError) {
					toast.error("Error uploading file");
					return;
				}
				fileUrl = uniqueId;
			}
			const finalUrl = selectedFile ? fileUrl : formData.url;

			const formDataWithUrl = { ...formData, url: finalUrl };

			const { data: insertedData, error: insertionError } = await supabase
				.from("link")
				.insert([formDataWithUrl || formData]);
			if (insertionError) {
				console.error("Error inserting data:", insertionError.message);
				toast.error("Error inserting data");
				return;
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

	const handleFileChange = (event: any) => {
		setSelectedFile(event.target.files[0]);
	};

	return (
		<>
			<div className="min-h-screen bg-white dark:bg-black">
				<div className="flex">
					<Link href="/">
						<Button variant="ghost" className="m-3">
							<ArrowBigLeft />
						</Button>
					</Link>
				</div>
				<div className="max-w-4xl mx-auto">
					<div className="flex justify-center space-x-4">
						<Image
							src={session?.user?.image as string}
							width={100}
							height={100}
							alt=""
							className="object-cover rounded-full"
						/>
					</div>
					<h1 className="text-black dark:text-white font-mono scroll-m-20 text-4xl text-center font-extrabold tracking-wider my-5 lg:text-5xl">
						Hello {session?.user?.name}
					</h1>
					<div className="flex my-5 justify-end mx-5">
						<Button
							onClick={() => {
								signOut();
								deleteCookies();
							}}
							className="mx-5"
						>
							<LogOut />
						</Button>
						<Dialog>
							<DialogTrigger className="rounded-md bg-zinc-800 p-2.5">
								<Plus className="w-5 h-5 text-white" />
							</DialogTrigger>
							<DialogContent>
								<DialogHeader className="text-3xl font-medium tracking-wide">
									Add Data
								</DialogHeader>
								<form onSubmit={handleSubmit}>
									<div className="flex items-center space-x-2 mb-5">
										<Label className="me-5">Url or File</Label>
										<Switch id="Url or File" onClick={handleChangeFile} />
									</div>
									{isFileInput ? (
										<>
											<label
												htmlFor="dropzone-file"
												className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
											>
												<div className="flex flex-col items-center justify-center pt-5 pb-6">
													<CloudUpload className="text-gray-500" />
													<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
														<span className="font-semibold">Click to upload</span>
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400">
														SVG, PNG, JPG or GIF (MAX. 800x400px)
													</p>
												</div>
												<input
													id="dropzone-file"
													type="file"
													className="hidden"
													onChange={handleFileChange}
												/>
											</label>
											{selectedFile && (
												<p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
													Selected file: {selectedFile.name}
												</p>
											)}
										</>
									) : (
										<Input
											className="mb-5"
											type="text"
											placeholder="Url"
											id="url"
											value={formData.url}
											onChange={handleChange}
										/>
									)}
									<Input
										className="my-5"
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
					<div className="p-4">
						<Table>
							<TableCaption>List of the Data Link</TableCaption>
							<ScrollArea className="h-[450px] rounded-md border p-4">
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
			</div>
		</>
	);
}
