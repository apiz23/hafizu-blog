"use client";

import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { motion } from "framer-motion";
import { PlusIcon, Send, Trash2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import confetti, {
	Confetti,
	ConfettiButton,
} from "@/components/magicui/confetti";
import type { ConfettiRef } from "@/components/magicui/confetti";

interface GradeListItem {
	grade: string;
	max: number;
	min: number;
}

interface CGPAProps {
	title: string;
	desc: string;
}

export default function CGPA({ title, desc }: CGPAProps) {
	const [rowCount, setRowCount] = useState<number>(1);
	const [grades, setGrades] = useState<string[]>([""]);
	const [credit, setCredits] = useState<string[]>([""]);
	const [lastCpa, setLastCpa] = useState<number>(0);
	const [lastCredit, setLastCredit] = useState<number>(0);
	const [resultMin, setResultMin] = useState<string>("0");
	const [resultMax, setResultMax] = useState<string>("0");
	const [resultMin1, setResultMin1] = useState<string>("0");
	const [resultMax1, setResultMax1] = useState<string>("0");

	const addRow = () => {
		setRowCount(rowCount + 1);
	};

	const deleteRow = (index: number) => {
		if (rowCount > 1) {
			setRowCount((prevCount) => prevCount - 1);

			const newGrades = [...grades];
			newGrades.splice(index, 1);

			const newCredits = [...credit];
			newCredits.splice(index, 1);

			setGrades(newGrades);
			setCredits(newCredits);
		} else {
			alert("You need at least one row.");
		}
	};

	const handleLastCpa = (event: ChangeEvent<HTMLInputElement>) => {
		setLastCpa(Number(event.target.value));
	};

	const handleLastCredit = (event: ChangeEvent<HTMLInputElement>) => {
		setLastCredit(Number(event.target.value));
	};

	const handleGradeChange = (index: number, value: string) => {
		const newGrades = [...grades];
		newGrades[index] = value;
		setGrades(newGrades);
	};

	const handleCreditChange = (index: number, value: string) => {
		const newCredits = [...credit];
		newCredits[index] = value;
		setCredits(newCredits);
	};

	const calculateWeightedAverage = (
		grades: string[],
		credit: string[],
		list: GradeListItem[]
	) => {
		let max = 0;
		let min = 0;
		let totalCredit = 0;

		for (let i = 0; i < grades.length; i++) {
			for (let j = 0; j < list.length; j++) {
				if (grades[i] === list[j].grade) {
					const creditValue = parseFloat(credit[i]);
					min += list[j].min * creditValue;
					max += list[j].max * creditValue;
					totalCredit += creditValue;
				}
			}
		}

		return {
			min: (min / totalCredit).toFixed(2),
			max: (max / totalCredit).toFixed(2),
			min1: ((min + lastCpa * lastCredit) / (lastCredit + totalCredit)).toFixed(2),
			max1: ((max + lastCpa * lastCredit) / (lastCredit + totalCredit)).toFixed(2),
		};
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		const list: GradeListItem[] = [
			{ grade: "A+", max: 4, min: 4 },
			{ grade: "A", max: 4, min: 4 },
			{ grade: "A-", max: 3.94, min: 3.7 },
			{ grade: "B+", max: 3.62, min: 3.3 },
			{ grade: "B", max: 3.24, min: 3 },
			{ grade: "B-", max: 2.94, min: 2.7 },
			{ grade: "C+", max: 2.62, min: 2.3 },
			{ grade: "C", max: 2.24, min: 2 },
			{ grade: "C-", max: 1.9, min: 1.5 },
			{ grade: "D", max: 1.4, min: 1 },
			{ grade: "E", max: 0, min: 0 },
		];
		const { min, max, min1, max1 } = calculateWeightedAverage(
			grades,
			credit,
			list
		);
		setResultMin(min);
		setResultMax(max);
		setResultMin1(min1);
		setResultMax1(max1);
	};
	return (
		<section className="py-2 md:px-2.5">
			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto w-full">
					<div className="my-6">
						<label
							htmlFor="cpa-input"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							CPA
						</label>
						<input
							type="number"
							id="cpa-input"
							aria-describedby="helper-text-explanation"
							onChange={handleLastCpa}
							className=" py-2.5 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
						/>
						<p
							id="helper-text-explanation"
							className="mt-2 text-sm text-gray-500 dark:text-gray-400"
						>
							CPA Last Semester
						</p>
					</div>
					<div className="my-6">
						<label
							htmlFor="credit-input"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Cumulative Credit
						</label>
						<input
							type="number"
							id="credit-input"
							aria-describedby="helper-text-explanation"
							onChange={handleLastCredit}
							className="py-2.5 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
						/>
						<p
							id="helper-text-explanation"
							className="mt-2 text-sm text-gray-500 dark:text-gray-400"
						>
							Cumulative Credit Last Semester
						</p>
					</div>
				</div>
				<form className="grid md:mx-auto" onSubmit={handleSubmit}>
					<div className="relative overflow-x-auto sm:rounded-md">
						<button
							type="button"
							className="text-white w-fit float-right bg-green-700 hover:bg-green-800 font-medium rounded-md text-sm px-2 py-1.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
							onClick={addRow}
						>
							<PlusIcon className="h-6 w-6 text-white" />
						</button>
					</div>
					<Table>
						<TableCaption>Subject and Grade</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">No</TableHead>
								<TableHead>Grade</TableHead>
								<TableHead>Credit</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: rowCount }).map((_, index) => (
								<TableRow>
									<TableCell className="font-medium">{index + 1}</TableCell>
									<TableCell className="px-3 py-4 w-1/2">
										<select
											className="mt-1.5 w-full py-2.5 rounded-lg bg-white border-gray-300 text-gray-700 sm:text-sm"
											value={grades[index]}
											onChange={(e) => handleGradeChange(index, e.target.value)}
										>
											<option defaultValue="">Grade</option>
											<option value="A+">A+</option>
											<option value="A">A</option>
											<option value="A-">A-</option>
											<option value="B+">B+</option>
											<option value="B">B</option>
											<option value="B-">B-</option>
											<option value="C+">C+</option>
											<option value="C">C</option>
											<option value="C-">C-</option>
											<option value="D">D</option>
											<option value="E">E</option>
										</select>
									</TableCell>
									<TableCell className="px-3 py-4 w-1/2">
										<select
											className="mt-1.5 w-full py-2.5 rounded-lg bg-white border-gray-300 text-gray-700 sm:text-sm"
											value={credit[index]}
											onChange={(e) => handleCreditChange(index, e.target.value)}
										>
											<option defaultValue="">Credit</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select>
									</TableCell>
									<TableCell className="px-3 py-4">
										<button
											type="button"
											className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
											onClick={() => deleteRow(index)}
										>
											<Trash2 className="h-5 w-5 text-white" />
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Dialog>
						<div className="relative overflow-x-auto sm:rounded-md py-5 flex justify-end">
							<DialogTrigger type="submit">
								<ConfettiButton>
									<Send className="text-blackk" />
								</ConfettiButton>
							</DialogTrigger>
						</div>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-3xl">Result</DialogTitle>
							</DialogHeader>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
								<div className="text-center rounded-md bg-neutral-700 py-3">
									{`${resultMin}`} {" < "}
									GPA {" < "}
									{`${resultMax}`}
								</div>
								<div className="text-center rounded-md bg-neutral-700 py-3">
									{`${resultMin1}`} {" < "}
									CPA {" < "}
									{`${resultMax1}`}
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</form>
			</div>
		</section>
	);
}
