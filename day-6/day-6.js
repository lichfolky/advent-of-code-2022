import fs from 'fs';

export function es6() {
    console.log("--- Day 6: Tuning Trouble ---");
    fs.readFile('./day-6/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // data = "bvwbjplbgvbhsrlpgdmjqwftvncz";


        console.log("\n\tRESULT: " + startOfPacketDetector(data));

        console.log(`\n------------------------------`);

        console.log("\n\tRESULT: " + startOfMessageDetector(data));

        console.log(`\n------------------------------`);
    });
}




/*
Find start-of-packet marker in the datastream.
Indicated by a sequence of four characters that are all different.
*/
function startOfPacketDetector(data) {
    let signalStartCounter = 1;
    let sequence = [];
    for (const packet of data) {
        if (sequence.length == 4) {
            sequence.shift();
            sequence.push(packet);
            // console.log(sequence, signalStartCounter);
            if (allDifferent(sequence)) {
                break;
            }
        } else {
            sequence.push(packet);
        }
        signalStartCounter++;
    }
    return signalStartCounter;
}

function startOfMessageDetector(data) {
    let signalStartCounter = 1;
    let sequence = [];
    for (const packet of data) {
        if (sequence.length == 14) {
            sequence.shift();
            sequence.push(packet);
            //console.log(sequence, signalStartCounter);
            if (allDifferent(sequence)) {
                break;
            }
        } else {
            sequence.push(packet);
        }
        signalStartCounter++;
    }
    return signalStartCounter;
}



function allDifferent(packet) {
    let test = [];
    for (const letter of packet) {
        if (test.includes(letter)) {
            return false;
        }
        test.push(letter);
    }
    return true;
}