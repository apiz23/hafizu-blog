"use client";

import { useState, useMemo } from "react";
import { normalPdf, normalCdf } from "@/utils/normal";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

type Point = {
	x: number;
	pdf: number;
};

export default function NormalDist() {
	const [x, setX] = useState<number>(1.0);
	const [inputVal, setInputVal] = useState<string>("1.0");

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
		pdf: {
			label: "Normal PDF",
			color: "hsl(var(--chart-4))",
		},
	} satisfies ChartConfig;

	const rowZ = Array.from({ length: 61 }, (_, i) => (-3 + i * 0.1).toFixed(1));
	const colZ = Array.from({ length: 10 }, (_, j) => (j * 0.01).toFixed(2));
	return (
		<Card className="border-none bg-black">
			<CardHeader>
				<CardTitle className="text-white mb-2">
					Standard Normal Distribution
				</CardTitle>

				<div className="mt-4">
					<Label htmlFor="zval" className="text-white">
						Z Value
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
						placeholder="Enter Z value"
					/>
				</div>
			</CardHeader>

			<CardContent className="md:p-6 p-0">
				<ChartContainer config={chartConfig}>
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
						<Area
							type="monotone"
							dataKey="pdf"
							data={leftArea}
							stroke="#fcd34d"
							fill="#fcd34d"
							fillOpacity={0.4}
							isAnimationActive={false}
						/>
						<Area
							type="monotone"
							dataKey="pdf"
							data={rightArea}
							stroke="#64748b"
							fill="#64748b"
							fillOpacity={0.4}
							isAnimationActive={false}
						/>
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

				<div className="grid md:grid-cols-3 gap-4 mt-6 text-white text-center text-sm md:text-base">
					<p>
						<strong>Z-score:</strong> {x.toFixed(4)}
					</p>
					<p className="flex items-center justify-center gap-2">
						<span className="w-4 h-4 rounded-sm bg-[#fcd34d]" />
						<strong>P(Z &lt; {x.toFixed(4)}):</strong> {area.toFixed(4)}
					</p>
					<p className="flex items-center justify-center gap-2">
						<span className="w-4 h-4 rounded-sm bg-[#64748b]" />
						<strong>P(Z &gt; {x.toFixed(4)}):</strong> {rightTail.toFixed(4)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
