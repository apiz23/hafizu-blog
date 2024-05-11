"use client";

import React, { useState } from "react";

export default function Matrix() {
	const [matrix, setMatrix] = useState([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]);
	const [size, setSize] = useState(3);
	const [result, setResult] = useState(null);

	const handleChange = (e: any, i: any, j: any) => {
		const newMatrix = [...matrix];
		newMatrix[i][j] = parseFloat(e.target.value);
		setMatrix(newMatrix);
	};

	const calculateDeterminant = () => {
		let det: any | null = null;
		if (size === 2) {
			det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
		} else if (size === 3) {
			det =
				matrix[0][0] * matrix[1][1] * matrix[2][2] +
				matrix[0][1] * matrix[1][2] * matrix[2][0] +
				matrix[0][2] * matrix[1][0] * matrix[2][1] -
				matrix[0][2] * matrix[1][1] * matrix[2][0] -
				matrix[0][1] * matrix[1][0] * matrix[2][2] -
				matrix[0][0] * matrix[1][2] * matrix[2][1];
		} else if (size === 4) {
			det =
				matrix[0][0] *
					(matrix[1][1] *
						(matrix[2][2] * matrix[3][3] - matrix[2][3] * matrix[3][2]) -
						matrix[1][2] *
							(matrix[2][1] * matrix[3][3] - matrix[2][3] * matrix[3][1]) +
						matrix[1][3] *
							(matrix[2][1] * matrix[3][2] - matrix[2][2] * matrix[3][1])) -
				matrix[0][1] *
					(matrix[1][0] *
						(matrix[2][2] * matrix[3][3] - matrix[2][3] * matrix[3][2]) -
						matrix[1][2] *
							(matrix[2][0] * matrix[3][3] - matrix[2][3] * matrix[3][0]) +
						matrix[1][3] *
							(matrix[2][0] * matrix[3][2] - matrix[2][2] * matrix[3][0])) +
				matrix[0][2] *
					(matrix[1][0] *
						(matrix[2][1] * matrix[3][3] - matrix[2][3] * matrix[3][1]) -
						matrix[1][1] *
							(matrix[2][0] * matrix[3][3] - matrix[2][3] * matrix[3][0]) +
						matrix[1][3] *
							(matrix[2][0] * matrix[3][1] - matrix[2][1] * matrix[3][0])) -
				matrix[0][3] *
					(matrix[1][0] *
						(matrix[2][1] * matrix[3][2] - matrix[2][2] * matrix[3][1]) -
						matrix[1][1] *
							(matrix[2][0] * matrix[3][2] - matrix[2][2] * matrix[3][0]) +
						matrix[1][2] *
							(matrix[2][0] * matrix[3][1] - matrix[2][1] * matrix[3][0]));
		}
		setResult(det);
	};

	const handleSizeChange = (e: any) => {
		const newSize = parseInt(e.target.value);
		setSize(newSize);
		setMatrix(new Array(newSize).fill(0).map(() => new Array(newSize).fill(0)));
	};

	const renderInputFields = () => {
		return matrix.map((row, i) => (
			<div key={i}>
				{row.map((value, j) => (
					<input
						key={`${i}-${j}`}
						type="number"
						value={value}
						onChange={(e) => handleChange(e, i, j)}
						className="h-20 px-2.5 w-24 m-3 rounded-xl border-gray-200"
					/>
				))}
			</div>
		));
	};

	return (
		<div className="h-screen pt-10">
			<div>
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					{size}x{size} Determinant
				</h3>
				<div className="w-full mx-auto">{renderInputFields()}</div>
				<div className="flex justify-between space-x-4 mt-10">
					<select
						className="mt-1.5 py-2.5 ps-2 w-full md:w-1/5 rounded-lg sm:text-sm"
						onChange={handleSizeChange}
						value={size}
					>
						<option value={2}>2x2</option>
						<option value={3}>3x3</option>
						<option value={4}>4x4</option>
					</select>
					<button
						className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
						onClick={calculateDeterminant}
					>
						<span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

						<span className="relative block border border-current bg-white px-8 py-3">
							Calculate
						</span>
					</button>
				</div>
				<div className="h-full flex justify-center item-center">
					{result !== null && <p>Answer: {result}</p>}
				</div>
			</div>
		</div>
	);
}
