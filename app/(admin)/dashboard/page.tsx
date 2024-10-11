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
import { useState } from "react";
import { Plus, CloudUpload, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import useRequireAuth from "../requireAuth";

const fetchLinks = async () => {
	const { data, error } = await supabase.from("link").select("*");
	if (error) throw error;
	return data;
};

const insertLink = async (formData: any) => {
	const { data, error } = await supabase.from("link").insert([formData]);
	if (error) throw error;
	return data;
};

export default function Page() {
	useRequireAuth();

	const [isFileInput, setIsFileInput] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [formData, setFormData] = useState({
		url: "",
		desc: "",
		category: "",
		type: "",
	});
	const queryClient = useQueryClient();

	const { data } = useQuery(["links"], fetchLinks);

	const mutation = useMutation(insertLink, {
		onSuccess: () => {
			toast.success("Data inserted successfully");
			queryClient.invalidateQueries(["links"]);
		},
		onError: (error: any) => {
			toast.error(`Error inserting data: ${error.message}`);
		},
	});

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

			mutation.mutate(formDataWithUrl);
			setFormData({
				url: "",
				desc: "",
				category: "",
				type: "",
			});
		} catch (error: any) {
			toast.error(`Error inserting data: ${error.message}`);
		}
	};

	const handleFileChange = (event: any) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSelectChange = (value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			type: value,
		}));
	};

	return (
		<>
			<div className="min-h-screen bg-whitebg-black">
				<div className="mx-auto pt-14">
					<div className="flex my-5 justify-end mx-5">
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
												className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50hover:bg-bray-800bg-gray-900 hover:bg-gray-100border-gray-600hover:border-gray-500hover:bg-gray-800"
											>
												<div className="flex flex-col items-center justify-center pt-5 pb-6">
													<CloudUpload className="text-gray-500" />
													<p className="mb-2 text-sm text-gray-500text-gray-400">
														<span className="font-semibold">Click to upload</span>
													</p>
													<p className="text-xs text-gray-500text-gray-400">
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
												<p className="text-sm text-gray-500text-gray-400 mb-5">
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
									<Select value={formData.type} onValueChange={handleSelectChange}>
										<SelectTrigger>
											<SelectValue placeholder="Type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="default" disabled>
												Select Type
											</SelectItem>
											<SelectItem value="video">Video</SelectItem>
											<SelectItem value="image">Image</SelectItem>
											<SelectItem value="zip">Zip</SelectItem>
											<SelectItem value="file">File</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
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
							<ScrollArea className="h-[70vh] rounded-md border p-4">
								<TableHeader>
									<TableRow>
										<TableHead className="w-[50px]">No</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Desc</TableHead>
										<TableHead>Created Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.map((item, index) => (
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
