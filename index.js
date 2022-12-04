import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { es1 } from "./day-1/day-1.js";
import { es2 } from "./day-2/day-2.js";
import { es3 } from "./day-3/day-3.js";
import { es4 } from "./day-4/day-4.js";

const rl = readline.createInterface({ input, output });

const myArgs = process.argv.slice(2);

let answer;
if (!myArgs[0]) {
    answer = await rl.question('What day solution do you want to run? ');
} else {
    answer = +myArgs[0];
}

switch (answer) {
    case 1:
        es1();
        break;
    case 2:
        es2();
        break;
    case 3:
        es3();
        break;
    case 4:
        es4();
        break;
    default:
        console.log("Wrong num");
}

rl.close();