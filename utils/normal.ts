// utils/normal.ts

export function normalPdf(x: number, mean: number, sd: number): number {
	const exponent = -((x - mean) ** 2) / (2 * sd ** 2);
	return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}

// Approximation of CDF using the error function (erf)
export function normalCdf(x: number, mean: number, sd: number): number {
	return 0.5 * (1 + erf((x - mean) / (sd * Math.sqrt(2))));
}

// Error function approximation (Abramowitz and Stegun formula)
function erf(x: number): number {
	const sign = x >= 0 ? 1 : -1;
	x = Math.abs(x);

	const a1 = 0.254829592;
	const a2 = -0.284496736;
	const a3 = 1.421413741;
	const a4 = -1.453152027;
	const a5 = 1.061405429;
	const p = 0.3275911;

	const t = 1 / (1 + p * x);
	const y =
		1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

	return sign * y;
}
