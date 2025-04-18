"use client";

import { useState, useEffect, useMemo } from "react";
import { normalPdf, normalCdf } from "@/utils/normal";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import NormalZTable from "./normalTable";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Point = {
	x: number;
	pdf: number;
};

export default function NormalDist() {
	const [x, setX] = useState<number>(1.0);
	const [inputVal, setInputVal] = useState<string>("1.0");
	const [useZScore, setUseZScore] = useState<boolean>(true);

	const area = useMemo(() => normalCdf(x, 0, 1), [x]);
	const rightTail = 1 - area;

	const minX = -4;
	const maxX = 4;

	const { leftArea, rightArea } = useMemo(() => {
		const xs: number[] = Array.from(
			{ length: 300 },
			(_, i) => minX + ((maxX - minX) * i) / 299
		);

		const leftArea: Point[] = [];
		const rightArea: Point[] = [];

		xs.forEach((val) => {
			const point: Point = {
				x: val,
				pdf: normalPdf(val, 0, 1),
			};

			if (val <= x) {
				leftArea.push(point);
			} else {
				rightArea.push(point);
			}
		});

		return { leftArea, rightArea };
	}, [x]);

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))",
		},
		pdf: {
			label: "Normal PDF",
			color: "hsl(var(--chart-4))",
		},
	} satisfies ChartConfig;

	return (
		<Card className="border-none bg-black">
			<CardHeader>
				<CardTitle className="text-white mb-2">
					Standard Normal Distribution Visualizer
				</CardTitle>

				<div className="flex flex-col md:flex-row md:justify-end gap-3 mt-4 text-white">
					<div className="flex items-center gap-2">
						<Label htmlFor="switch" className="p-1 md:p-4 whitespace-nowrap">
							Use Z-Score
						</Label>
						<Switch
							checked={useZScore}
							onCheckedChange={setUseZScore}
							id="switch"
							className="border border-white"
						/>
					</div>

					<Dialog>
						<DialogTrigger className="rounded-lg p-2 text-base text-center">
							<Button variant="secondary">Open Table</Button>
						</DialogTrigger>
						<DialogContent className="max-w-[90%] md:max-w-fit py-10">
							<DialogHeader className="mb-5">
								<DialogTitle>Normal Distribution Table</DialogTitle>
							</DialogHeader>
							<NormalZTable />
						</DialogContent>
					</Dialog>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
					<div className="flex flex-col gap-1 md:ms-5">
						<Label htmlFor="zval" className="text-white">
							{useZScore ? "Z Value" : "X Value"}
						</Label>
						<Input
							id="zval"
							type="text"
							value={inputVal}
							onChange={(e) => {
								const val = e.target.value;
								setInputVal(val);

								const parsed = parseFloat(val);
								if (!isNaN(parsed)) {
									setX(parsed);
								}
							}}
							placeholder={useZScore ? "Z value" : "X value"}
						/>
					</div>
				</div>
			</CardHeader>

			<CardContent className="md:p-6 p-0">
				<ChartContainer config={chartConfig} className="mx-auto w-full">
					<AreaChart
						width={600}
						height={300}
						data={[...leftArea, ...rightArea]}
						margin={{ top: 10, right: 30, left: 12, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="x"
							domain={[minX, maxX]}
							type="number"
							tickFormatter={(value) => value.toFixed(1)}
							tickLine={false}
							axisLine={false}
						/>

						<YAxis />
						<ChartTooltip
							content={<ChartTooltipContent indicator="line" />}
							cursor={{ strokeDasharray: "3 3" }}
						/>

						{/* LEFT shaded area */}
						<Area
							type="monotone"
							dataKey="pdf"
							data={leftArea}
							stroke="#fcd34d"
							fill="#fcd34d"
							fillOpacity={0.4}
							isAnimationActive={false}
						/>

						{/* RIGHT shaded area */}
						<Area
							type="monotone"
							dataKey="pdf"
							data={rightArea}
							stroke="#64748b"
							fill="#64748b"
							fillOpacity={0.4}
							isAnimationActive={false}
						/>

						{/* Outline full curve */}
						<Area
							type="monotone"
							dataKey="pdf"
							data={[...leftArea, ...rightArea]}
							stroke="var(--color-pdf)"
							fill="transparent"
							isAnimationActive={false}
						/>
					</AreaChart>
				</ChartContainer>

				{/* Output values */}
				<div className="grid md:grid-cols-3 gap-4 mt-6 text-white text-sm md:text-base text-center">
					<p>
						<strong>Z-score:</strong> {x.toFixed(4)}
					</p>

					<p className="flex items-center justify-center gap-2">
						<span className="inline-block w-4 h-4 rounded-sm bg-[#fcd34d]" />
						<strong>P(Z &lt; {x.toFixed(4)}):</strong> {area.toFixed(4)}
					</p>

					<p className="flex items-center justify-center gap-2">
						<span className="inline-block w-4 h-4 rounded-sm bg-[#64748b]" />
						<strong>P(Z &gt; {x.toFixed(4)}):</strong> {rightTail.toFixed(4)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
