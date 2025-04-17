"use client";

import { normalCdf } from "@/utils/normal";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function NormalZTable() {
	// From -3.0 to +3.0 (0.1 steps) => 61 rows
	const rowZ = Array.from({ length: 61 }, (_, i) => (-3 + i * 0.1).toFixed(1));
	const colZ = Array.from({ length: 10 }, (_, j) => (j * 0.01).toFixed(2));

	return (
		<div className="h-[60vh] overflow-x-auto w-full">
			<Table className="min-w-[1000px]">
				<TableCaption>
					Standard Normal Distribution Table (P(Z &lt; z))
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[80px]">Z</TableHead>
						{colZ.map((col) => (
							<TableHead key={col}>{col}</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{rowZ.map((row) => (
						<TableRow key={row}>
							<TableCell className="font-medium">{row}</TableCell>
							{colZ.map((col) => {
								const z = parseFloat(row) + parseFloat(col);
								return <TableCell key={col}>{normalCdf(z, 0, 1).toFixed(4)}</TableCell>;
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
