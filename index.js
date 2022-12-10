import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs';
import { es1 } from "./day-1/day-1.js";
import { es2 } from "./day-2/day-2.js";
import { es3 } from "./day-3/day-3.js";
import { es4 } from "./day-4/day-4.js";
import { es5 } from "./day-5/day-5.js";
import { es6 } from "./day-6/day-6.js";
import { es7 } from "./day-7/day-7.js";
import { es8 } from "./day-8/day-8.js";
import { es9 } from "./day-9/day-9.js";
// import { es10 } from "./day-10/day-10.js";
// import { es11 } from "./day-11/day-11.js";
// import { es12 } from "./day-12/day-12.js";
// import { es13 } from "./day-13/day-13.js";
// import { es14 } from "./day-14/day-14.js";
// import { es15 } from "./day-15/day-15.js";
// import { es16 } from "./day-16/day-16.js";
// import { es17 } from "./day-17/day-17.js";
// import { es18 } from "./day-18/day-18.js";
// import { es19 } from "./day-19/day-19.js";
// import { es20 } from "./day-20/day-20.js";
// import { es21 } from "./day-21/day-21.js";
// import { es22 } from "./day-22/day-22.js";
// import { es23 } from "./day-23/day-23.js";
// import { es24 } from "./day-24/day-24.js";
// import { es25 } from "./day-25/day-25.js";

const rl = readline.createInterface({ input, output });

const myArgs = process.argv.slice(2);

let answer;
if (!myArgs[0]) {
    answer = await rl.question('What day solution do you want to run? ');
} else {
    answer = +myArgs[0];
}
rl.close();

fs.readFile('./welcome-text.txt', 'utf8', (err, text) => {
    if (err) {
        console.error(err);
        return;
    }
    //console.log(text);
    switch (answer) {
        case 1: es1(); break;
        case 2: es2(); break;
        case 3: es3(); break;
        case 4: es4(); break;
        case 5: es5(); break;
        case 6: es6(); break;
        case 7: es7(); break;
        case 8: es8(); break;
        case 9: es9(); break;
        case 10: es10(); break;
        case 11: es11(); break;
        case 12: es12(); break;
        case 13: es13(); break;
        case 14: es14(); break;
        case 15: es15(); break;
        case 16: es16(); break;
        case 17: es17(); break;
        case 18: es18(); break;
        case 19: es19(); break;
        case 20: es20(); break;
        case 21: es21(); break;
        case 22: es22(); break;
        case 23: es23(); break;
        case 24: es24(); break;
        case 25: es25(); break;
        default:
            console.log("Wrong num");
    }
});
