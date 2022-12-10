import fs from 'fs';

const COLS = 1000;
const ROWS = 1000;
const ropeSimulation = Array(ROWS).fill().map(() => Array(COLS).fill('·'));
const tailSimulation = Array(ROWS).fill().map(() => Array(COLS).fill('·'));
let tailRow = 500;
let tailCol = 500;
let headRow = 500;
let headCol = 500;
export function es9() {
    console.log("--- Day 9: Rope Bridge ---");
    fs.readFile('./day-9/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // data =
        //     `R 4
        //      U 4
        //      L 3
        //      D 1
        //      R 4
        //      D 1
        //      L 5
        //      R 2`;

        let motionsSeries = data.split("\n")
            .map(couple => couple.trim().split(" "));

        // console.log("\nINPUT:\n\t" + motionsSeries.join("\n\t"));
        ropeSimulation[headRow][headCol] = 's';
        tailSimulation[tailRow][tailCol] = '#';
        motionsSeries.forEach(([direction, num]) => itFollows(direction, num));

        console.log("\n", tailSimulation.map(row => row.join("")).join("\n"), "\n");

        console.log("\tRESULT: ", countTails());
        console.log(`\n------------------------------`);
    });
}

function itFollows(direction, num) {

    console.log(`== ${direction} ${num} ==`, headRow, headCol);
    for (let i = 0; i < +num; i++) {
        ropeSimulation[headRow][headCol] = '·';
        if (direction == "U") {
            headRow--;
        }
        if (direction == "D") {
            headRow++;
        }
        if (direction == "R") {
            headCol++;
        }
        if (direction == "L") {
            headCol--;
        }
        moveTail();
        ropeSimulation[headRow][headCol] = 'H';
        //console.log(ropeSimulation.map(row => row.join("")).join("\n"), "\n");
    }
}

function moveTail() {
    //console.log(` ${headCol} ${tailCol} - ${headRow} ${tailRow} \n`);
    ropeSimulation[tailRow][tailCol] = 'T';
    if (headRow == tailRow && headCol == tailCol) { return; }
    // head up
    if (headRow == tailRow - 1 && headCol == tailCol) { return; }
    if (headRow == tailRow - 1 && headCol == tailCol + 1) { return; }
    if (headRow == tailRow && headCol == tailCol + 1) { return; }
    if (headRow == tailRow + 1 && headCol == tailCol + 1) { return; }
    if (headRow == tailRow + 1 && headCol == tailCol) { return; }
    if (headRow == tailRow + 1 && headCol == tailCol - 1) { return; }
    if (headRow == tailRow && headCol == tailCol - 1) { return; }
    if (headRow == tailRow - 1 && headCol == tailCol - 1) { return; }
    ropeSimulation[tailRow][tailCol] = '·';
    // R
    if (headRow == tailRow && headCol > tailCol + 1) {
        tailCol++;
        ropeSimulation[tailRow][tailCol] = 'T';
        tailSimulation[tailRow][tailCol] = '#';
        return;
    }
    // L
    if (headRow == tailRow && headCol < tailCol + 1) {
        tailCol--;
        ropeSimulation[tailRow][tailCol] = 'T';
        tailSimulation[tailRow][tailCol] = '#';
        return;
    }
    // D
    if (headRow > tailRow + 1 && headCol == tailCol) {
        tailRow++;
        ropeSimulation[tailRow][tailCol] = 'T';
        tailSimulation[tailRow][tailCol] = '#';
        return;
    }
    // U
    if (headRow < tailRow - 1 && headCol == tailCol) {
        tailRow--;
        ropeSimulation[tailRow][tailCol] = 'T';
        tailSimulation[tailRow][tailCol] = '#';
        return;
    }

    if (headRow > tailRow) {
        tailRow++;
    }
    if (headRow < tailRow) {
        tailRow--;
    }
    if (headCol > tailCol) {
        tailCol++;
    }
    if (headCol < tailCol) {
        tailCol--;
    }
    ropeSimulation[tailRow][tailCol] = 'T';
    tailSimulation[tailRow][tailCol] = '#';
}

const countTails = () => tailSimulation
    .reduce((count, row) => count += row.reduce((countRow, el) => countRow += el == "#" ? 1 : 0, 0), 0);