"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Quadratic() {
	const [a, setA] = useState("");
	const [b, setB] = useState("");
	const [c, setC] = useState("");
	const [answer, setAnswer] = useState<number[]>([0, 0]);
	const handleChange = (setState: any) => (event: any) => {
		setState(event.target.value);
	};

	const handleCalculate = () => {
		const coefficientA = parseFloat(a) || 0;
		const coefficientB = parseFloat(b) || 0;
		const coefficientC = parseFloat(c) || 0;

		const discriminant = coefficientB ** 2 - 4 * coefficientA * coefficientC;

		if (discriminant < 0) {
			return;
		}

		const root1 = (-coefficientB + Math.sqrt(discriminant)) / (2 * coefficientA);
		const root2 = (-coefficientB - Math.sqrt(discriminant)) / (2 * coefficientA);
		setAnswer([root1, root2]);
	};

	return (
		<>
			<div className="h-full pt-10">
				{/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wider uppercase lg:text-6xl">
					Quadratic
				</h1> */}
				<p className="text-gray-300 text-xl">General Form: ax^2 + bx + c</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-3 md:px-0 mt-10">
					<div className="mb-4">
						<input
							type="text"
							className="form-input mt-1 block w-full px-2.5 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							value={a}
							placeholder="a"
							onChange={handleChange(setA)}
						/>
					</div>

					<div className="mb-4">
						<input
							type="text"
							className="form-input mt-1 block w-full px-2.5 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							value={b}
							placeholder="b"
							onChange={handleChange(setB)}
						/>
					</div>
					<div className="mb-4">
						<input
							type="text"
							className="form-input mt-1 block w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							value={c}
							placeholder="c"
							onChange={handleChange(setC)}
						/>
					</div>
				</div>
				<div className="">
					<Button className="md:w-1/5 w-full mx-auto" onClick={handleCalculate}>
						Calculate
					</Button>
					<div className="flex space-x-3 justify-center pt-32">
						<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 border rounded-md p-5">
							Root 1: {answer[0]}
						</h2>
						<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 border rounded-md p-5">
							Root 2: {answer[1]}
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}
