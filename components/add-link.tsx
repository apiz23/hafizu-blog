"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CloudUpload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import supabase from "@/lib/supabase";

interface AddDataFormProps {
	onSubmitSuccess: () => void;
	mutate: (data: any) => void;
}

export const AddLink: React.FC<AddDataFormProps> = ({
	onSubmitSuccess,
	mutate,
}) => {
	const [isFileInput, setIsFileInput] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [formData, setFormData] = useState({
		url: "",
		desc: "",
		category: "",
		type: "",
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

	const handleFileChange = (event: any) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSelectChange = (value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			type: value,
		}));
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
			const userEmail = sessionStorage.getItem("user-email");
			if (!userEmail) {
				toast.error("User email not found. Please log in again.");
				return;
			}
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
			const formDataWithUrl = {
				...formData,
				url: finalUrl,
				email: userEmail,
			};
			mutate(formDataWithUrl);
			setFormData({
				url: "",
				desc: "",
				category: "",
				type: "",
			});
			setSelectedFile(null);
			onSubmitSuccess();
		} catch (error: any) {
			toast.error(`Error inserting data: ${error.message}`);
		}
	};

	return (
		<DialogContent className="bg-black text-black">
			<DialogHeader className="text-3xl font-medium tracking-wide text-white">
				Add Data
			</DialogHeader>
			<form onSubmit={handleSubmit} className="text-black font-medium">
				<div className="flex items-center space-x-2 mb-5 text-white">
					<Label className="me-5">Url or File</Label>
					<Switch id="Url or File" onClick={handleChangeFile} />
				</div>
				{isFileInput ? (
					<>
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50hover:bg-bray-800bg-gray-900 hover:bg-gray-100border-gray-600hover:border-gray-500hover:bg-gray-800"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
								<CloudUpload />
								<p className="mb-2 text-sm">
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
							<p className="text-sm text-gray-400 my-5">
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
					<SelectTrigger className="text-black">
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
					<Button variant="secondary" type="submit" className="text-black">
						Submit
					</Button>
				</div>
			</form>
		</DialogContent>
	);
};
