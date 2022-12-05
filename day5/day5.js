const fs = require('fs');
const readline = require('readline');

const regexNumbersAndSpaces = /^[0-9 ]+$/;
const regexCharSpacesBrackets = /^[A-Z\[ \] ]+$/;

loadCrates = function (oCrates, aBuffer) {

    aBuffer.forEach(row => {

        crateMatch = row.matchAll(/(\s{4,5})|([A-Z])/g);
        let pos = 0;
        for (const match of crateMatch) {
            pos++;

            if (match[0].match(/^\s*$/)) {
                continue; //Skip whitespace
            }
            oCrates[pos].push(match[0]);
        }
    });
}


moveCrate = function (crates, numberOfCrates, iFrom, iTo) {
    for (let i = 0; i < numberOfCrates; i++) {
        crates[iTo].push(crates[iFrom].pop());
    }
}

moveCrate9001 = function (crates, numberOfCrates, iFrom, iTo) {
    let count = numberOfCrates * -1;
    crates[iFrom].slice(count).forEach(e => {
        crates[iFrom].pop();
        crates[iTo].push(e)
    });
    
}

exports.run = function () {

    const stream = fs.createReadStream("day5/input.txt");
    //const stream = fs.createReadStream("day5/example.txt");
    const reader = readline.createInterface({ input: stream });

    crates = {};
    crates2 = {};
    let cratesBuffer = [];
    reader.on("line", row => {


        //Buffer up crates
        if (row.match(regexCharSpacesBrackets)) {
            cratesBuffer.unshift(row);
            return;
        }

        //End of crate definition, build crates data
        if (row.match(regexNumbersAndSpaces)) {
            //console.log(row);

            
            for (const match of row.matchAll(/[0-9]/g)) {
                crates[match[0]] = [];
                crates2[match[0]] = [];
            }

            loadCrates(crates, cratesBuffer);
            loadCrates(crates2, cratesBuffer);
            return;
        }

        //for (const match of row.matchAll(/^move (\d+) from (\d+) to (\d+)$/g)) {
        for (const match of row.matchAll(/move (\d+) from (\d+) to (\d+)/g)) {
            //console.log(match[1], match[2], match[3]);

            let numberOfCrates = match[1];
            let iFrom = match[2];
            let iTo = match[3];

            moveCrate(crates, numberOfCrates, iFrom, iTo);
            moveCrate9001(crates2, numberOfCrates, iFrom, iTo);
        }
    });

    reader.on("close", () => {
        console.log("\n*** DAY 5  ***");
        //console.log(crates);
        
        let finalMessage = ''
        for (const key in crates) {
            if (Object.hasOwnProperty.call(crates, key)) {
                finalMessage += crates[key].at(-1);
            }
        }
        console.log(finalMessage);

        let finalMessage9001 = ''
        for (const key2 in crates2) {
            if (Object.hasOwnProperty.call(crates2, key2)) {
                finalMessage9001 += crates2[key2].at(-1);
            }
        }
        console.log(finalMessage9001);
    });
}