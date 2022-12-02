import fs from 'fs';

export function es1() {
    console.log("--- Day 1: Calorie Counting ---");
    fs.readFile('./day-1/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("RESULT: " +
            Math.max(...data.split("\n\n").map((cals) =>
                cals.split("\n")
                    .reduce((sum, cal) => sum + Number(cal), 0))));

        console.log(`------------------------------`);

        let calsTotals = data
            .split("\n\n")
            .map((cals) =>
                cals.split("\n")
                    .reduce((sum, cal) =>
                        sum + Number(cal), 0))
            .sort((a, b) => b - a);

        let top3Cals = calsTotals[0] + calsTotals[1] + calsTotals[2];
        console.log("RESULT: " + calsTotals[0] + " + " + calsTotals[1] + " + " + calsTotals[2] + " = " + top3Cals);

        console.log(`------------------------------`);

    });
}