"use client";

import { Tabs } from "@/components/tabs";
import Quadratic from "./quadratic/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import Matrix from "./matrix/page";

export default function Page() {
	const items = [
		{ title: "Quadratic Equation", url: "/quadratic", image: "" },
		{ title: "Matrix", url: "/matrix", image: "" },
	];

	const tabs = [
		{
			title: "Quadratic Equation",
			value: "quadratic equation",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-slate-900">
					<p className="scroll-m-20 text-4xl font-extrabold tracking-wider uppercase lg:text-6xl">
						Quadratic Equation
					</p>
					<Quadratic />
				</div>
			),
		},
		{
			title: "Matrix",
			value: "matrix",
			content: (
				<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-slate-900">
					<p className="scroll-m-20 text-4xl font-extrabold tracking-wider uppercase lg:text-6xl">
						Matrix
					</p>
					<Matrix />
				</div>
			),
		},
	];

	return (
		<>
			<div className="pt-32">
				<header className="text-center mb-10">
					<h2 className="text-xl font-bold text-gray-300 sm:text-5xl">Calculator</h2>
					<p className="mx-auto mt-4 max-w-md text-gray-400">
						Very few calculator for doing online calculation such as quadratic, matrix
						and etc.
					</p>
				</header>
				<ScrollArea className="h-fit md:px-0 px-5 rounded-lg">
					<div className="h-[20rem] md:h-screen [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mb-40">
						<Tabs tabs={tabs} />
					</div>
				</ScrollArea>
				{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{items.map((item, index) => (
						<Link
							key={index}
							href={`calculator/${item.url}`}
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
				</div> */}
			</div>
		</>
	);
}
