"use client";

import { useState } from "react";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import CGPA from "./cgpa/page";
import Quadratic from "./quadratic/page";
import NormalDist from "./normal-dist/page";
import BlurIn from "@/components/magicui/blur-in";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function Page() {
	const [selectedCalc, setSelectedCalc] = useState("cgpa");

	const calculators: Record<
		string,
		{ title: string; content: React.ReactNode }
	> = {
		cgpa: {
			title: "CGPA Calculator",
			content: (
				<>
					<BlurIn
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl text-white"
						word="CGPA Calculator"
					/>
					<CGPA />
				</>
			),
		},
		quadratic: {
			title: "Quadratic Equation",
			content: (
				<>
					<BlurIn
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl text-white"
						word="Quadratic Equation"
					/>
					<Quadratic />
				</>
			),
		},
		normal: {
			title: "Normal Distribution",
			content: (
				<>
					<BlurIn
						className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl text-white"
						word="Normal Distribution"
					/>
					<NormalDist />
				</>
			),
		},
	};

	const selected = calculators[selectedCalc];

	return (
		<div className="min-h-screen pb-20">
			<header className="text-center px-5 pt-24">
				<GradualSpacing
					className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl"
					text="Calculator"
				/>
				<p className="mx-auto mt-4 max-w-md text-gray-400">
					Very few calculators for doing online calculation such as quadratic,
					matrix, and more.
				</p>
			</header>

			<div className="py-10 md:px-0 px-4 max-w-4xl mx-auto w-full">
				<Select value={selectedCalc} onValueChange={setSelectedCalc}>
					<SelectTrigger className="w-full md:w-fit gap-5 bg-black text-white border">
						<SelectValue placeholder="Select a calculator" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="cgpa">CGPA Calculator</SelectItem>
						<SelectItem value="quadratic">Quadratic Equation</SelectItem>
						<SelectItem value="normal">Normal Distribution</SelectItem>
					</SelectContent>
				</Select>

				<div className="mt-6">
					<div className="w-full overflow-hidden relative rounded-2xl p-3 text-xl md:text-4xl font-bold text-black border-2">
						{selected.content}
					</div>
				</div>
			</div>
		</div>
	);
}
