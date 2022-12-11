import fs from 'fs';

let stack = [1];
let pc = 0;

export function es10() {
    console.log("--- Day 10: Cathode-Ray Tube ---");
    fs.readFile('./day-10/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        /*
        addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
        noop takes one cycle to complete. It has no other effect.
        */

        /*
        signal strength (the cycle number multiplied by the value of the X register) 
        during the 20th cycle and every 40 cycles after that 
        (that is, during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).
        */

        /* data = `addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop`; */

        let operations = data.split("\n")
            .map(couple => couple.trim().split(" "));


        operations.forEach(op => executeOp(op[0], op[1]));

        let signalStrength = 0;
        let x = 0;
        let sumX = [stack[0]];
        //console.log(stack.join(" "));
        for (const [index, addx] of stack.entries()) {

            if ((index - 20) % 40 == 0 && index > 0) {
                console.log("test:", index, addx, x, index * x);
                signalStrength += index * x;
            }
            x += addx;
            sumX.push(x);
        }
        //console.log(stack.map((el, ind) => ind + " " + el).join("\n"));
        console.log(sumX.map((el, ind) => ind + " " + el).join("\n"));


        console.log("\n\tRESULT: " + signalStrength);


        console.log(`\n------------------------------`);
    });
}


function executeOp(opName, value) {
    if (opName == "noop") {
        pc++;

        if (stack[pc] == undefined) {
            stack[pc] = 0;
        }
    }
    if (opName == "addx") {
        pc++;
        if (stack[pc] == undefined) {
            stack[pc] = 0;
        }
        pc++;
        stack[pc] = +value;
    }
}
