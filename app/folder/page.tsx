"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function page() {
	const [levels, setLevels] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchLevels() {
			try {
				const { data, error } = await supabase.from("level").select("*");
				setLevels(data || []);
			} catch (error: any) {
				setError(error.message);
			}
		}
		fetchLevels();
	}, []);

	return (
		<>
			{error && <p>Error: {error}</p>}
			<div className="min-h-screen w-full p-10 md:space-x-2 grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-black">
				{levels.map((level) => (
					<Card
						key={level.id}
						className="dark:hover:text-black hover:bg-zinc-200 md:h-52 h-4/5"
					>
						<button>
							<CardContent className="p-5">
								<CardTitle className="capitalize tracking-wider">
									{level.name}
								</CardTitle>
							</CardContent>
						</button>
					</Card>
				))}
			</div>
		</>
	);
}
