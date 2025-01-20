"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { LoaderIcon } from "lucide-react";

export default function Page() {
	const [matricNo, setMatricNo] = useState("");
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (e: any) => {
		e.preventDefault();

		if (!matricNo) {
			toast.error("Please enter a matric number.");
			return;
		}

		const yearCode = matricNo.slice(2, 4);
		const session = `20${yearCode}20${parseInt(yearCode) + 1}`;

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
				throw new Error("Image not found. Please check your matric number.");
			}

			const data = await response.json();
			setImageUrl(data.imageUrl);
		} catch (err: any) {
			setImageUrl(null);
			toast.error(err.message || "An unexpected error occurred.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="min-h-screen space-x-3 px-5">
				<div className="pt-28 pb-10 md:pt-20">
					<GradualSpacing
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl my-5"
						text="UTHM Photo Finder"
					/>
					<p className="text-md text-center text-neutral-400">
						Simply enter your UTHM Matric Number to find your images effortlessly.
					</p>
					<div className="max-w-7xl mx-auto">
						<Card className="max-w-2xl mx-auto rounded-md bg-transparent border-none text-white">
							<CardContent className="my-10">
								<div className="my-10 text-center max-w-xl mx-auto">
									{imageUrl ? (
										<Image
											src={imageUrl}
											alt="Student"
											className="w-[60vw] md:w-1/2 rounded-md mx-auto"
											height={500}
											width={500}
										/>
									) : (
										<div className="text-sm text-neutral-200">
											No image found. Please try again.
										</div>
									)}
								</div>
								<form onSubmit={handleSearch}>
									<div className="max-w-2xl mb-5 md:px-8 space-y-4">
										<Input
											className="text-black rounded"
											placeholder="Matric Number..."
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												setMatricNo(e.target.value.toUpperCase())
											}
										/>
										<div className="flex justify-end">
											<Button type="submit">
												{isLoading ? (
													<LoaderIcon className="animate-spin mx-auto text-white" />
												) : (
													"Search"
												)}
											</Button>
										</div>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
