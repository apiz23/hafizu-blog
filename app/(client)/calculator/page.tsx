"use client";

import GradualSpacing from "@/components/magicui/gradual-spacing";
import CGPA from "./cgpa/page";
import Quadratic from "./quadratic/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
	const tabs = [
		{
			title: "CGPA Calculator",
			value: "CGPA Calculator",
			content: (
				<div className="w-full overflow-hidden relative h-3/5 rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-slate-900">
					<GradualSpacing
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl"
						text="CGPA Calculator"
					/>
					<CGPA />
				</div>
			),
		},
		{
			title: "Quadratic Equation",
			value: "quadratic equation",
			content: (
				<div className="w-full overflow-hidden relative h-3/5 rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-600 to-slate-900">
					<GradualSpacing
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl"
						text="Quadratic Equation"
					/>
					<Quadratic />
				</div>
			),
		},
	];

	return (
		<>
			<>
				<header className="text-center pt-36">
					<h2 className="text-xl font-bold text-gray-300 sm:text-5xl">Calculator</h2>
					<p className="mx-auto mt-4 max-w-md text-gray-400">
						Very few calculator for doing online calculation such as quadratic, matrix
						and etc.
					</p>
				</header>
				<div className="min-h-screen pt-32 md:px-0 px-2.5 md:mb-0 mb-20">
					<Tabs defaultValue={tabs[0].value} className="w-full mx-auto max-w-4xl">
						<TabsList>
							{tabs.map((tab) => (
								<TabsTrigger key={tab.value} value={tab.value}>
									{tab.title}
								</TabsTrigger>
							))}
						</TabsList>
						{tabs.map((tab) => (
							<TabsContent key={tab.value} value={tab.value}>
								{tab.content}
							</TabsContent>
						))}
					</Tabs>
				</div>
			</>
		</>
	);
}
