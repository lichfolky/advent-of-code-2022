import fs from 'fs';

export function es4() {
    console.log("--- Day 4: Camp Cleanup ---");
    fs.readFile('./day-4/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // data =
        //     `2-4,6-8
        //     2-3,4-5
        //     5-7,7-9
        //     2-8,3-7
        //     6-6,4-6
        //     2-6,4-8`;


        let sum = data.split("\n")
            .map(couple => couple.trim())
            .reduce((sum, couple) => {
                let [elf1, elf2] = couple.split(",");
                let [x1, x2] = elf1.split("-");
                let [y1, y2] = elf2.split("-");
                return sum + contains(+x1, +x2, +y1, +y2);
            }, 0);

        console.log("\n\tRESULT: " + sum);


        console.log(`\n------------------------------`);

        sum = data.split("\n")
            .map(couple => couple.trim())
            .reduce((sum, couple) => {
                let [elf1, elf2] = couple.split(",");
                let [x1, x2] = elf1.split("-");
                let [y1, y2] = elf2.split("-");
                return sum + overlap(+x1, +x2, +y1, +y2);
            }, 0);

        console.log("\n\tRESULT: " + sum);
        console.log(`\n------------------------------`);
    });
};

// 491 no
function contains(x1, x2, y1, y2) {

    //  7 75 18 75
    if (x1 <= y1 && x2 >= y2) {
        console.log(" " + x1, x2, y1, y2, "true");
        return 1;
    }
    // 56 96 11 96 
    if (y1 <= x1 && y2 >= x2) {
        console.log(" " + x1, x2, y1, y2, "true");
        return 1;
    }
    return 0;
}


function overlap(x1, x2, y1, y2) {

    if (x1 <= y1 && x2 >= y1) {
        console.log(" " + x1, x2, y1, y2, "true");

        return 1;
    }
    if (y1 <= x1 && y2 >= x1) {
        console.log(" " + x1, x2, y1, y2, "true");
        return 1;
    }
    return 0;
}

