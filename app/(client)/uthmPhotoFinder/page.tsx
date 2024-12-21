"use client";

import { useState } from "react";
import Image from "next/image";
import { RiFileImageLine } from "react-icons/ri";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";

export default function Page() {
	const [matricNo, setMatricNo] = useState("");
	const [session, setSession] = useState("20232024");
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (e: any) => {
		e.preventDefault();

		if (!matricNo) {
			toast.error("Please enter a matric number.");
			return;
		}

		setImageUrl(null);
		setIsLoading(true); 
		toast.dismiss();

		try {
			const apiUrl = process.env.NEXT_PUBLIC_PERSONAL_API;
			if (!apiUrl) {
				throw new Error(
					"API URL is not configured. Please check your environment variables."
				);
			}

			const response = await fetch(
				`${apiUrl}/hafizu-blog/image?session=${session}&matricNumber=${matricNo}`
			);
			if (!response.ok) {
				throw new Error(
					"Image not found. Please check your matric number and session."
				);
			}

			const data = await response.json();
			setImageUrl(data.imageUrl);
		} catch (err: any) {
			setImageUrl(null);
			toast.error(err.message || "An unexpected error occurred.");
		} finally {
			setIsLoading(false); 
			setIsDrawerOpen(true);
		}
	};

	return (
		<>
			<div className="min-h-screen pt-24">
				<Card className="max-w-2xl mx-auto rounded-md bg-transparent border-none text-white">
					<RiFileImageLine className="mx-auto" size={75} />
					<CardHeader>
						<CardTitle className="tracking-wider font-medium text-xl md:text-4xl text-center">
							Search Your Image
						</CardTitle>
						<CardDescription className="text-md text-center">
							Use your UTHM Number Matric Number
						</CardDescription>
					</CardHeader>
					<CardContent className="my-10">
						<div className="max-w-2xl mb-5 md:px-8 space-y-4">
							<div className="block">
								<Label htmlFor="session" className="text-sm text-gray-400">
									Select Session:
								</Label>
								<div className="w-full md:w-[10vw]">
									<Select
										name="session"
										value={session}
										onValueChange={(value: string) => {
											setSession(value);
										}}
									>
										<SelectTrigger className="text-black">
											<SelectValue placeholder="Select Session" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="20232024">2023/2024</SelectItem>
											<SelectItem value="20222023">2022/2023</SelectItem>
											<SelectItem value="20212022">2021/2022</SelectItem>
											<SelectItem value="20202021">2020/2021</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<Input
								className="text-black"
								placeholder="Matric Number..."
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setMatricNo(e.target.value)
								}
							/>
							<div className="flex justify-end">
								<Button onClick={handleSearch}>
									{isLoading ? (
										<div className="animate-spin border-2 border-transparent border-t-gray-500 w-5 h-5 rounded-full"></div>
									) : (
										"Search"
									)}
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerContent className="bg-neutral-800/90 border-none min-h-[40vh] max-h-[80vh] pb-32">
					<div className="mx-auto w-full max-w-sm">
						<DrawerHeader className="pt-10">
							<DrawerTitle className="text-white">Search Result</DrawerTitle>
							<DrawerDescription>Matric Number: {matricNo}</DrawerDescription>
						</DrawerHeader>
						<div className="mt-10 text-center">
							{imageUrl ? (
								<Image
									src={imageUrl}
									alt="Student"
									className="max-w-full h-auto rounded-md mx-auto"
									height={500}
									width={500}
								/>
							) : (
								<div className="text-sm text-gray-500">
									No image found. Please try again.
								</div>
							)}
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
}
