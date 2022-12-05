const fs = require('fs');
const readline = require('readline');

readElf = function (section) {
    let elf = section.split('-');
    elf[0] = parseInt(elf[0]);
    elf[1] = parseInt(elf[1]);
    return elf;
}

isBetween = function (iSection, aElf) {
    if (iSection >= aElf[0] && iSection <= aElf[1]) {
        return true;
    } else {
        return false;
    }
}



exports.run = function () {

    const stream = fs.createReadStream("day4/input.txt");
    //const stream = fs.createReadStream("day4/example.txt");
    const reader = readline.createInterface({ input: stream });

    let fullOverlap = 0;
    let partialOverlap = 0;

    reader.on("line", row => {
        sections = row.split(",");
        elf1 = readElf(sections[0]);
        elf2 = readElf(sections[1]);

        //test fully overlap
        if (isBetween(elf1[0], elf2) && isBetween(elf1[1], elf2) ||
            isBetween(elf2[0], elf1) && isBetween(elf2[1], elf1)) {
            fullOverlap++;
            partialOverlap++;
            return;
        }

        //test partial overlap
        if (isBetween(elf1[0], elf2) ||
            isBetween(elf1[1], elf2)) {
            partialOverlap++;
        }

    });

    reader.on("close", () => {
        console.log("\n*** DAY 4  ***");
        console.log("Number of sections with full overlapp: " + fullOverlap);
        console.log("Number of sections with partial overlapp: " + partialOverlap);
    });
}