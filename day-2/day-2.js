import fs from 'fs';

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;


//  A for Rock, B for Paper, and C for Scissors
let col1 = {
    'A': ROCK,
    'B': PAPER,
    'C': SCISSORS
};
//  X for Rock, Y for Paper, and Z for Scissors
let col2 = {
    'X': ROCK,
    'Y': PAPER,
    'Z': SCISSORS
};

export function es2() {
    console.log("--- Day 2: Rock Paper Scissors ---");
    fs.readFile('./day-2/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let totalScore = data.split("\n").map(couple =>
            score(col1[couple[0]], col2[couple[2]])
        ).reduce((sum, cal) => sum + Number(cal), 0);
        console.log("RESULT: " + totalScore);
        console.log(`------------------------------`);

        totalScore = data.split("\n").map(couple =>
            score(col1[couple[0]], realStrategy(col1[couple[0]], couple[2]))
        ).reduce((sum, cal) => sum + Number(cal), 0);
        console.log("RESULT: " + totalScore);
        console.log(`------------------------------`);
    });
}

function score(opponentChoice, myChoice) {
    if (opponentChoice == myChoice) {
        return myChoice + 3;
    }
    if (opponentChoice == ROCK) {
        if (myChoice == PAPER) {
            return myChoice + 6;
        } else {
            return myChoice;
        }
    }
    if (opponentChoice == PAPER) {
        if (myChoice == SCISSORS) {
            return myChoice + 6;
        } else {
            return myChoice;
        }
    }
    if (opponentChoice == SCISSORS) {
        if (myChoice == ROCK) {
            return myChoice + 6;
        }
        else {
            return myChoice;
        }
    }
}


// X means you need to lose,
// Y means you need to end the round in a draw
// Z means you need to win.
function realStrategy(opponentChoice, strategy) {
    if (strategy === 'Y') {
        return opponentChoice;
    }

    if (strategy === 'X') {
        if (opponentChoice == ROCK) {
            return SCISSORS;
        }
        if (opponentChoice == PAPER) {
            return ROCK;
        }
        if (opponentChoice == SCISSORS) {
            return PAPER;
        }
    }

    if (strategy === 'Z') {
        if (opponentChoice == ROCK) {
            return PAPER;
        }
        if (opponentChoice == PAPER) {
            return SCISSORS;

        }
        if (opponentChoice == SCISSORS) {
            return ROCK;
        }
    }

}