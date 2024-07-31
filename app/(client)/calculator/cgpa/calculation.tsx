export interface GradeListItem {
	grade: string;
	max: number;
	min: number;
}

export function calculateWeightedAverage(
	grades: string[],
	credit: string[],
	lastCpa: number,
	lastCredit: number
) {
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
}
