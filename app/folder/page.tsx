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
			<div className="w-full p-10 my-10 space-x-6 grid grid-cols-1 md:grid-cols-2 border border-white">
				{levels.map((level) => (
					<button>
						<Card key={level.id}>
							<CardHeader className="text-center p-5">
								<CardTitle className="capitalize tracking-wider">
									{level.name}
								</CardTitle>
							</CardHeader>
						</Card>
					</button>
				))}
			</div>
		</>
	);
}
