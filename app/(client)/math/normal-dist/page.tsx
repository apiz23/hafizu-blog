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
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type Point = {
	x: number;
	pdf: number;
};

export default function NormalDist() {
	const [mean, setMean] = useState<number>(60);
	const [sd, setSD] = useState<number>(10);
	const [x, setX] = useState<number>(70);
	const [z, setZ] = useState<number>((70 - 60) / 10);
	const [useZScore, setUseZScore] = useState<boolean>(false);

	useEffect(() => {
		setZ((x - mean) / sd);
	}, [x, mean, sd]);

	useEffect(() => {
		if (useZScore) {
			setX(mean + z * sd);
		}
	}, [z, mean, sd, useZScore]);

	const area = useMemo(() => normalCdf(x, mean, sd), [x, mean, sd]);
	const rightTail = 1 - area;

	const minX = mean - 3 * sd;
	const maxX = mean + 3 * sd;

	const { leftArea, rightArea } = useMemo(() => {
		const xs: number[] = Array.from(
			{ length: 200 },
			(_, i) => minX + ((maxX - minX) * i) / 199
		);

		const leftArea: Point[] = [];
		const rightArea: Point[] = [];

		xs.forEach((val) => {
			const point: Point = {
				x: val,
				pdf: normalPdf(val, mean, sd),
			};

			if (val <= x) {
				leftArea.push(point);
			} else {
				rightArea.push(point);
			}
		});

		return { leftArea, rightArea };
	}, [mean, sd, x]);

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
					Normal Distribution Visualizer
				</CardTitle>

				<div className="flex justify-end gap-3 mt-4 text-white">
					<Label htmlFor="switch">Use Z-Score</Label>
					<Switch
						checked={useZScore}
						onCheckedChange={setUseZScore}
						id="switch"
						className="border border-white"
					/>
					<Dialog>
						<DialogTrigger className="bg-slate-700 rounded-lg p-2 text-base">
							Open Table
						</DialogTrigger>
						<DialogContent className="max-w-[90%] md:max-w-fit py-10">
							<DialogHeader className="mb-5">
								<DialogTitle>Normal Distributation Table</DialogTitle>
							</DialogHeader>
							<NormalZTable />
						</DialogContent>
					</Dialog>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
					<div className="flex flex-col gap-1">
						<Label htmlFor="mean" className="text-white">
							Mean
						</Label>
						<Input
							id="mean"
							type="number"
							value={mean}
							onChange={(e) => setMean(+e.target.value)}
							placeholder="Mean"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<Label htmlFor="sd" className="text-white">
							Standard Deviation
						</Label>
						<Input
							id="sd"
							type="number"
							value={sd}
							onChange={(e) => setSD(+e.target.value)}
							placeholder="Standard Deviation"
						/>
					</div>

					{useZScore ? (
						<div className="flex flex-col gap-1">
							<Label htmlFor="zval" className="text-white">
								Z Value
							</Label>
							<Input
								id="zval"
								type="number"
								value={z}
								onChange={(e) => setZ(+e.target.value)}
								placeholder="Z value"
							/>
						</div>
					) : (
						<div className="flex flex-col gap-1">
							<Label htmlFor="xval" className="text-white">
								X Value
							</Label>
							<Input
								id="xval"
								type="number"
								value={x}
								onChange={(e) => setX(+e.target.value)}
								placeholder="X value"
							/>
						</div>
					)}
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
							tickFormatter={(value) =>
								useZScore ? `${((value - mean) / sd).toFixed(1)}` : value.toFixed(0)
							}
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
						<strong>Z-score:</strong> {z.toFixed(2)}
					</p>

					<p className="flex items-center justify-center gap-2">
						<span className="inline-block w-4 h-4 rounded-sm bg-[#fcd34d]" />
						<strong>P(X &lt; {x.toFixed(2)}):</strong> {area.toFixed(4)}
					</p>

					<p className="flex items-center justify-center gap-2">
						<span className="inline-block w-4 h-4 rounded-sm bg-[#64748b]" />
						<strong>P(X &gt; {x.toFixed(2)}):</strong> {rightTail.toFixed(4)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
