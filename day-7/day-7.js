import { dir } from 'console';
import fs from 'fs';

export function es7() {
    console.log("--- Day 7: No Space Left On Device ---");
    fs.readFile('./day-7/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // data = `$ cd /
        // $ ls
        // dir a
        // 14848514 b.txt
        // 8504156 c.dat
        // dir d
        // $ cd a
        // $ ls
        // dir e
        // 29116 f
        // 2557 g
        // 62596 h.lst
        // $ cd e
        // $ ls
        // 584 i
        // $ cd ..
        // $ cd ..
        // $ cd d
        // $ ls
        // 4060174 j
        // 8033020 d.log
        // 5626152 d.ext
        // 7214296 k`;

        let lines = data.split("\n")
            .map(line => line.trim());


        let fs = { name: "/", content: [], type: "dir" };
        fs.parent = fs;

        let currentDir = fs;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            console.log(currentDir.name, " ", line);
            if (line[0] === "$") {
                let [op, command, arg] = line.split(" ");
                if (command == "cd") {
                    if (arg == "/") {
                        currentDir = fs;
                    } else {
                        if (arg == "..") {
                            currentDir = currentDir.parent;
                        } else {
                            for (const item of currentDir.content) {
                                if (item.type == "dir" && item.name == arg) {
                                    currentDir = item;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (command == "ls") {
                    while (i < lines.length - 1) {
                        if (lines[i + 1][0] === "$") {
                            break;
                        }
                        i++;
                        let [size, name] = lines[i].split(" ");
                        console.log("\t", size, name);
                        if (size == "dir") {
                            const newDir = { name: name, content: [], type: "dir", parent: currentDir };
                            currentDir.content.push(newDir);
                        } else {
                            const newFile = { name: name, size: size, type: "file", parent: currentDir };
                            currentDir.content.push(newFile);
                        }
                    }
                }
            }

        }

        calcSum(fs);
        console.log("\n\tRESULT: ", checkSizes(fs));

        console.log(`\n------------------------------`);
        let update = 30000000;

        console.log("\n\tRESULT: ", checkMinFolder(fs, 30000000 - (70000000 - fs.size)));

        console.log(`\n------------------------------`);

    });
}


function calcSum(item) {
    if (item.type == "dir") {
        let sum = 0;
        for (const elem of item.content) {
            sum += +calcSum(elem);
        }
        item.size = sum;
        return item.size;
    } else {
        return item.size;
    }
}


function checkSizes(parent) {
    let sum = 0;
    if (parent.type == "dir") {
        if (+parent.size <= 100000) {
            console.log(parent.name, ": ", +parent.size);
            sum += parent.size;

        }
        for (const elem of parent.content) {
            sum += +checkSizes(elem);
        }

    }
    return sum;

}

function checkMinFolder(parent, sizeToFree) {
    let candidates = [];
    if (parent.type == "dir") {
        if (parent.size >= sizeToFree) {
            candidates.push(parent.size);
        }
        for (const elem of parent.content) {
            let elemMin = checkMinFolder(elem, sizeToFree);
            if (elemMin) {
                candidates.push(elemMin);
            }
        }
        console.log(parent.name, ":", parent.size, sizeToFree, "l", candidates);
        if (candidates.length > 0)
            return Math.min(...candidates);
    }
}

