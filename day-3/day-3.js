import fs from 'fs';

// case sensitive
// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.

let priority = (el) => {
    let val = el.charCodeAt(0);
    // UPPERCASE
    if (val >= 65 && val <= 90) {
        return el.charCodeAt(0) - 64 + 26;
    }
    if (val >= 97 && val <= 122) {
        return el.charCodeAt(0) - 96;
    }
    return 0;
};


export function es3() {
    console.log("--- Day 3: Rucksack Reorganization ---");
    fs.readFile('./day-3/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // data =
        //     `vJrwpWtwJgWrhcsFMMfFFhFp
        //     jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        //     PmmdzqPrVvPwwTWBwg
        //     wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        //     ttgJtRGJQctTZtZT
        //     CrZsJsPPZsGzwwsLwLmpwMDw`;


        let sumPriorities = 0;
        let rugsacks = data.split("\n").map(el => el.trim());
        rugsacks.forEach((rucksack) => {
            let found = "";
            let comp1 = rucksack.slice(0, rucksack.length / 2);
            let comp2 = rucksack.slice(rucksack.length / 2, rucksack.length);

            for (const item of comp1) {
                if ([...comp2].find(el => el === item)) {
                    found = item;
                    sumPriorities += priority(item);
                    break;
                }
            }
            // console.log(comp1, " ", comp2, " ", found);

        });

        console.log("\n\tRESULT: " + sumPriorities);


        console.log(`\n------------------------------`);

        sumPriorities = 0;

        for (let i = 0; i < rugsacks.length; i = i + 3) {

            let itemsSet = new Set();
            let itemsSet2 = new Set();
            let itemsSet3 = new Set();
            [...rugsacks[i]].forEach(el => itemsSet.add(el));
            [...rugsacks[i + 1]].forEach(el => {
                if (itemsSet.has(el)) {
                    itemsSet2.add(el);
                }
            });
            [...rugsacks[i + 2]].forEach(el => {
                if (itemsSet2.has(el)) {
                    itemsSet3.add(el);
                }
            });
            if (itemsSet3.size == 1) {
                const [unique] = itemsSet3;
                //console.log("s: " + unique, priority(unique));
                sumPriorities += priority(unique);
            }
        }
        console.log("\n\tRESULT: " + sumPriorities);
        console.log(`\n------------------------------`);
    });
};
