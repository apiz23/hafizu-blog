"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, LoaderIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
	const [links, setLinks] = useState<any>([]);
	const [filteredLinks, setFilteredLinks] = useState<any>([]);

	useEffect(() => {
		async function fetchLinks() {
			try {
				const response = await fetch(`/api/link`);
				const data = await response.json();
				if (response.ok) {
					setLinks(data);
					setFilteredLinks(data);
				} else {
					toast.error(data.error);
				}
			} catch (error: any) {
				toast.error(error.message);
			}
		}

		fetchLinks();
	}, []);

	const handleCategoryClick = (category: string) => {
		const filtered = links.filter((link: any) => link.type === category);
		setFilteredLinks(filtered);
	};

	return (
		<>
			<div className="md:h-screen">
				<div className="space-x-3 py-5">
					<div className="outline outline-1 p-5 mx-3 rounded-md mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
						{Array.from(new Set(links.map((link: any) => link.type))).map(
							(linkType: any, index: any) => (
								<Card key={index}>
									<CardContent className=" hover:bg-slate-500 rounded-md">
										<p
											className="w-full uppercase text-lg cursor-pointer px-2.5 py-2"
											onClick={() => handleCategoryClick(linkType)}
										>
											{linkType}
										</p>
									</CardContent>
								</Card>
							)
						)}
					</div>
					<div className="pe-5">
						<Table className="bg-zinc-90 max-w-3xl mx-auto border border-fuchsia-500 ">
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Id</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Description</TableHead>
									<TableHead className="text-right">Date Created</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredLinks.map((link: any, index: any) => (
									<TableRow key={index + 1}>
										<TableCell className="font-medium">
											<Dialog>
												<DialogTrigger className="hover:bg-slate-800 hover:text-emerald-200 border-2 rounded-md w-10 h-10">
													{index + 1}
												</DialogTrigger>
												<DialogContent className="w-96 break-words">
													<h1>Details</h1>
													<Label className="w-[200px]">{link.url}</Label>
												</DialogContent>
											</Dialog>
										</TableCell>
										<TableCell>{link.category}</TableCell>
										<TableCell>{link.desc}</TableCell>
										<TableCell className="text-right">{link.created_at}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</>
	);
}

function getYoutubeId(url: string) {
	const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	if (match && match[2].length === 11) {
		return match[2];
	} else {
		return "error";
	}
}
