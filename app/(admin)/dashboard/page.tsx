"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import supabase from "@/lib/supabase";
import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import useRequireAuth from "../requireAuth";
import { AddLink } from "@/components/add-link";
import { Input } from "@/components/ui/input";

const fetchLinks = async () => {
	const email = sessionStorage.getItem("user-email");
	const { data, error } = await supabase
		.from("link")
		.select("*")
		.eq("email", email);
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

	const [links, setLinks] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	const getLinks = async () => {
		try {
			setLoading(true);
			const data = await fetchLinks();
			setLinks(data || []);
		} catch (error: any) {
			console.error(error);
			toast.error(`Error fetching links: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getLinks();
	}, []);

	const handleInsertLink = async (formData: any) => {
		try {
			await insertLink(formData);
			toast.success("Data inserted successfully");
			getLinks();
		} catch (error: any) {
			toast.error(`Error inserting data: ${error.message}`);
		}
	};

	const handleSearch = (e: any) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
	};

	const filteredLinks = links.filter(
		(link: any) =>
			link.category.toLowerCase().includes(searchQuery) ||
			link.desc.toLowerCase().includes(searchQuery) ||
			link.type.toLowerCase().includes(searchQuery)
	);

	return (
		<>
			<div className="flex py-8 px-5 text-white">
				<h3 className="scroll-m-20 text-4xl font-bold tracking-tight">Dashboard</h3>
			</div>
			<div className="flex my-5 justify-between mx-5">
				<div className="flex">
					<Input
						type="text"
						placeholder="Filter"
						className="bg-black text-white rounded md:w-[30vw]"
						value={searchQuery}
						onChange={handleSearch}
					/>
				</div>
				<Dialog>
					<DialogTrigger className="rounded-md bg-zinc-800 p-2.5">
						<Plus className="w-5 h-5 text-black" />
					</DialogTrigger>
					<AddLink mutate={handleInsertLink} onSubmitSuccess={() => {}} />
				</Dialog>
			</div>
			<div className="p-4">
					<div className="h-[70vh] overflow-auto rounded border border-neutral-700 text-white">
						<Table className="w-full">
							<TableHeader className="font-bold">
								<TableRow className="hover:bg-neutral-900">
									<TableHead>No</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Created Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="font-semibold">
								{loading ? (
									<TableRow>
										<TableCell colSpan={5} className="text-center">
											Loading...
										</TableCell>
									</TableRow>
								) : filteredLinks.length > 0 ? (
									filteredLinks.map((item, index) => (
										<TableRow key={item.id}>
											<TableCell className="font-medium">
												<Link href={`${window.location.pathname}/${item.id}`}>
													<Button variant="default">{index + 1}</Button>
												</Link>
											</TableCell>
											<TableCell>{item.category}</TableCell>
											<TableCell>{item.desc}</TableCell>
											<TableCell>{item.type}</TableCell>
											<TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={5} className="text-center">
											No links found.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
			</div>
		</>
	);
}
