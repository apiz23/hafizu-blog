"use client";

import GradualSpacing from "@/components/magicui/gradual-spacing";
import CGPA from "./cgpa/page";
import Quadratic from "./quadratic/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlurIn from "@/components/magicui/blur-in";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
	const tabs = [
		{
			title: "CGPA Calculator",
			value: "CGPA Calculator",
			content: (
				<div className="w-full overflow-hidden relative h-3/5 rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-neutral-500 to-black">
					<BlurIn
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl"
						word="CGPA Calculator"
					/>
					<CGPA />
				</div>
			),
		},
		{
			title: "Quadratic Equation",
			value: "quadratic equation",
			content: (
				<div className="w-full overflow-hidden relative h-3/5 rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-neutral-500 to-black">
					<BlurIn
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl"
						word="Quadratic Equation"
					/>
					<Quadratic />
				</div>
			),
		},
	];

	return (
		<>
			<div className="min-h-screen">
				<header className="text-center px-5 pt-24">
					<GradualSpacing
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl"
						text="Calculator"
					/>
					<p className="mx-auto mt-4 max-w-md text-gray-400">
						Very few calculator for doing online calculation such as quadratic, matrix
						and etc.
					</p>
				</header>
				<div className="pt-10 md:px-0 px-2.5">
					<Tabs defaultValue={tabs[0].value} className="w-full mx-auto max-w-4xl">
						<TabsList>
							{tabs.map((tab) => (
								<TabsTrigger key={tab.value} value={tab.value}>
									{tab.title}
								</TabsTrigger>
							))}
						</TabsList>
						<ScrollArea className="h-[60vh] md:h-fit">
							{tabs.map((tab) => (
								<TabsContent key={tab.value} value={tab.value}>
									{tab.content}
								</TabsContent>
							))}
						</ScrollArea>
					</Tabs>
				</div>
			</div>
		</>
	);
}
