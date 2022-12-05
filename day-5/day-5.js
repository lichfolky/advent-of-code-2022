import fs from 'fs';
let crates = [];

export function es5() {
    console.log("--- Day 5: Supply Stacks ---");
    fs.readFile('./day-5/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        //         data =
        //             `[D]
        // [N] [C]
        // [Z] [M] [P]
        // 1   2   3

        // move 1 from 2 to 1
        // move 3 from 1 to 3
        // move 2 from 2 to 1
        // move 1 from 1 to 2`;

        //         data =
        //             `    [D]
        // [N] [C]
        // [Z] [M] [P]
        // 1   2   3

        // move 1 from 2 to 1
        // move 3 from 1 to 3
        // move 2 from 2 to 1
        // move 1 from 1 to 2`;

        let rows = data.split("\n");
        let readCrates = true;
        for (let i = 0; i < rows.length; i++) {
            if (readCrates) {
                if (rows[i].trim() == "") {
                    readCrates = false;
                    for (let i = 0; i < crates.length; i++) {
                        if (crates[i] == undefined) {
                            crates.push([]);
                        }
                    }
                    console.log(crates);
                } else {
                    createCrates(rows[i]);
                }
            } else {
                //console.log("\n       ", crates);
                moveCratesNew(rows[i]);
            }
        }

        console.log("\n\tRESULT: ", crates.map((list) => list.shift()).join(""));
        // no TFQDJMCHF
        console.log(`\n------------------------------`);


    });
}

// max 9 crates
function createCrates(row) {
    for (let i = 0; i < row.length; i = i + 4) {
        if (row[i] === '[') {
            // console.log(i, i / 4, row[i], row[i + 1], row[i + 2]);
            if (crates[i / 4] == undefined) {
                crates[i / 4] = [row[i + 1]];
            } else {
                crates[i / 4].push(row[i + 1]);
            }

        }
    }
}
// move 1 from 2 to 1
function moveCrates(order) {
    let numbers = order.match(/(\d[\d\.]*)/g);
    let quantity = numbers[0];
    let from = numbers[1] - 1;
    let to = numbers[2] - 1;

    for (let i = 0; i < quantity; i++) {
        let auxItem = crates[from].shift();
        if (auxItem != undefined) {
            crates[to].unshift(auxItem);
        } else {
            crates[from] = [];
            break;
        }
    }
    console.log(order);
    console.log(crates);
}

function moveCratesNew(order) {
    let numbers = order.match(/(\d[\d\.]*)/g);
    let quantity = numbers[0];
    let from = numbers[1] - 1;
    let to = numbers[2] - 1;

    let auxItems = crates[from].splice(0, quantity);
    console.log(auxItems);

    if (crates[from] == undefined) {
        crates[from] = [];
    }
    // }
    crates[to].unshift(...auxItems);

    console.log(order);
    console.log(crates);

}