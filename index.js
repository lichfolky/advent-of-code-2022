import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { es1 } from "./day-1/day-1.js";

const rl = readline.createInterface({ input, output });

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

let answer;
if (!myArgs[0]) {
    answer = await rl.question('What day solution do you want to run? ');
} else {
    answer = +myArgs[0];
}

if (answer == 1) {
    es1();
}

rl.close();