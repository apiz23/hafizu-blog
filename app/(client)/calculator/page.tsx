"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {

	const items = [
		{ title: "Quadratic Equation", url: "/quadratic", image: "" },
		{ title: "Matrix", url: "/matrix", image: "" },
	];

	return (
		<>
			<div className="h-screen pt-32">
				<header className="text-center mb-10">
					<h2 className="text-xl font-bold text-gray-300 sm:text-5xl">
						item Collection
					</h2>
					<p className="mx-auto mt-4 max-w-md text-gray-400">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
						praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
						natus?
					</p>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{items.map((item, index) => (
						<Link
							href={`${window.location.pathname}${item.url}`}
							className="group block overflow-hidden"
						>
							<Card
								key={index}
								className="h-[250px] w-full object-cover transition duration-300 group-hover:scale-105 sm:h-[250px]"
							>
								<CardContent className="flex justify-center items-center h-full">
									<CardTitle>{item.title}</CardTitle>
									<CardDescription></CardDescription>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
