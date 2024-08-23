"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { PlusIcon, Trash2 } from "lucide-react";
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
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { calculateWeightedAverage } from "./calculation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CGPA() {
	const [rows, setRows] = useState([{ grade: "", credit: "" }]);
	const [lastCpa, setLastCpa] = useState<number>(0);
	const [lastCredit, setLastCredit] = useState<number>(0);
	const [results, setResults] = useState({
		min: "0",
		max: "0",
		min1: "0",
		max1: "0",
	});

	const handleRowChange = (
		index: number,
		field: "grade" | "credit",
		value: string
	) => {
		const updatedRows = [...rows];
		updatedRows[index][field] = value;
		setRows(updatedRows);
	};

	const addRow = () => setRows([...rows, { grade: "", credit: "" }]);

	const deleteRow = (index: number) => {
		if (rows.length > 1) {
			setRows(rows.filter((_, i) => i !== index));
		} else {
			alert("You need at least one row.");
		}
	};

	const handleLastCpaChange = (event: ChangeEvent<HTMLInputElement>) =>
		setLastCpa(Number(event.target.value));
	const handleLastCreditChange = (event: ChangeEvent<HTMLInputElement>) =>
		setLastCredit(Number(event.target.value));

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const { min, max, min1, max1 } = calculateWeightedAverage(
			rows.map((row) => row.grade),
			rows.map((row) => row.credit),
			lastCpa,
			lastCredit
		);
		setResults({ min, max, min1, max1 });
	};

	return (
		<section className="py-2 md:px-2.5">
			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto w-full">
					<div className="my-6">
						<Label
							htmlFor="cpa-input"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							CPA
						</Label>
						<Input
							type="number"
							id="cpa-input"
							onChange={handleLastCpaChange}
							className="py-2.5 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
						/>
						<p
							id="helper-text-explanation"
							className="mt-2 text-sm text-gray-500 dark:text-gray-400"
						>
							CPA Last Semester
						</p>
					</div>
					<div className="my-6">
						<Label
							htmlFor="credit-input"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Cumulative Credit
						</Label>
						<Input
							type="number"
							id="credit-input"
							onChange={handleLastCreditChange}
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
						<Button
							type="button"
							className="text-white w-fit float-right bg-green-700 hover:bg-green-800 font-medium rounded-md text-sm px-2 py-1.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
							onClick={addRow}
						>
							<PlusIcon className="h-6 w-6 text-white" />
						</Button>
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
							{rows.map((row, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{index + 1}</TableCell>
									<TableCell className="p-0 pe-2 md:px-3 md:py-4 w-1/2">
										<Select
											onValueChange={(value) => handleRowChange(index, "grade", value)}
											value={row.grade}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Grade" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="A+">A+</SelectItem>
												<SelectItem value="A">A</SelectItem>
												<SelectItem value="A-">A-</SelectItem>
												<SelectItem value="B+">B+</SelectItem>
												<SelectItem value="B">B</SelectItem>
												<SelectItem value="B-">B-</SelectItem>
												<SelectItem value="C+">C+</SelectItem>
												<SelectItem value="C">C</SelectItem>
												<SelectItem value="C-">C-</SelectItem>
												<SelectItem value="D">D</SelectItem>
												<SelectItem value="E">E</SelectItem>
											</SelectContent>
										</Select>
									</TableCell>
									<TableCell className="p-0 pe-2 md:px-3 md:py-4 w-1/2">
										<Select
											onValueChange={(value) => handleRowChange(index, "credit", value)}
											value={row.credit}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Credit" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="1">1</SelectItem>
												<SelectItem value="2">2</SelectItem>
												<SelectItem value="3">3</SelectItem>
												<SelectItem value="4">4</SelectItem>
											</SelectContent>
										</Select>
									</TableCell>
									<TableCell className="px-3 py-4">
										<Button
											className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
											onClick={() => deleteRow(index)}
										>
											<Trash2 className="h-5 w-5 text-white" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Dialog>
						<div className="relative overflow-x-auto sm:rounded-md py-5 flex justify-end">
							<DialogTrigger
								type="submit"
								className="rounded-md bg-white text-black p-2.5 text-lg"
							>
								Submit
							</DialogTrigger>
						</div>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-3xl">Result</DialogTitle>
							</DialogHeader>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
								<div className="text-center rounded-md bg-neutral-700 py-3">
									{`${results.min}`} {" < "} GPA {" < "} {`${results.max}`}
								</div>
								<div className="text-center rounded-md bg-neutral-700 py-3">
									{`${results.min1}`} {" < "} CPA {" < "} {`${results.max1}`}
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</form>
			</div>
		</section>
	);
}
