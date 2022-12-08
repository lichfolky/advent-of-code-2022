import fs from 'fs';

export function es8() {
    console.log("--- Day 8: Treetop Tree House ---");
    fs.readFile('./day-8/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // data = `30373
        //         25512
        //         65332
        //         33549
        //         35390`;

        let map = data.split("\n")
            .map(row => row.trim().split(""));

        let height = map.length;
        let width = map[0].length;

        console.log(map.map(row => row.join("")).join("\n"), "\n");
        console.log(map.map((row, y) => row.map((cols, x) => visible(map, width, height, y, x) ? "T" : ".").join("")).join("\n"));

        let visibleSum = map.reduce((sum, row, y) =>
            sum + row.reduce((sum, cols, x) =>
                visible(map, width, height, y, x) ? sum + 1 : sum, 0), 0);

        console.log("\nRESULT: ", visibleSum);

        console.log(`\n------------------------------`);

        // console.log(map.map(row => row.join("")).join("\n"), "\n");
        // console.log(map.map((row, y) => row.map((cols, x) => treesScenicScore(map, width, height, y, x)).join("")).join("\n"));

        let maxTreesScenicScore = map.reduce((max, row, y) =>
            Math.max(max, row.reduce((rowMax, cols, x) =>
                Math.max(rowMax, treesScenicScore(map, width, height, y, x)), 0)), 0);

        console.log("\nRESULT: ", maxTreesScenicScore);
    });
}

/* 
A tree is visible if all of the other trees between 
it and an edge of the grid are shorter than it.
Only consider trees in the same row or column; 
that is, only look up, down, left, or right from any given tree.
*/

function visible(map, width, height, yi, xi) {
    let visible = true;

    // up
    for (let y = 0; y < yi && visible; y++) {
        if (map[y][xi] >= map[yi][xi]) {
            visible = false;
        }
    }

    if (visible) { return true; }
    visible = true;

    // down
    for (let y = yi + 1; y < height && visible; y++) {
        if (map[y][xi] >= map[yi][xi]) {
            visible = false;
        }
    }

    if (visible) { return true; }
    visible = true;

    //left

    for (let x = 0; x < xi; x++) {
        if (map[yi][x] >= map[yi][xi]) {
            visible = false;
        }
    }
    if (visible) { return true; }
    visible = true;

    // right
    for (let x = xi + 1; x < width; x++) {
        if (map[yi][x] >= map[yi][xi]) {
            visible = false;
        }
    }

    return visible;
}



function treesScenicScore(map, width, height, yi, xi) {
    let up = 0;
    for (let y = yi - 1; y >= 0; y--) {
        up++;
        if (map[y][xi] >= map[yi][xi]) {
            break;
        }
    }

    let down = 0;
    for (let y = yi + 1; y < height && visible; y++) {
        down++;
        if (map[y][xi] >= map[yi][xi]) {
            break;
        }

    }

    let left = 0;
    for (let x = xi - 1; x >= 0; x--) {
        left++;
        if (map[yi][x] >= map[yi][xi]) {
            break;
        }
    }

    let right = 0;
    for (let x = xi + 1; x < width; x++) {
        right++;
        if (map[yi][x] >= map[yi][xi]) {
            break;
        }
    }
    //console.log(yi, xi, ": ", up, down, left, right, " - ", up * down * left * right);
    return up * down * left * right;
}