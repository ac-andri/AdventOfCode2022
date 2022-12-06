const fs = require('fs');
const readline = require('readline');


isUnique = function (sText) {
    if (!sText || sText == '') {
        return true;
    } else {
        let sChar = sText[0];
        for (let i = 1; i < sText.length; i++) {
            if (sChar == sText[i]) {
                return false;
            }
        }
        return isUnique(sText.substring(1));
    }
}

findUniqueGroup = function(sRow, iSize){
    for (let i = 0; i <= sRow.length - iSize; i++) {
        if (isUnique(sRow.substring(i,i+iSize))) {
            return i+iSize;
        }
    }
}

exports.run = function () {

    const stream = fs.createReadStream("day6/input.txt");
    //const stream = fs.createReadStream("day6/example.txt");
    //const stream = fs.createReadStream("day6/example2.txt");
    const reader = readline.createInterface({ input: stream });

    let iMarker = 0;
    let iMessageMarker = 0;
    reader.on("line", row => {

        iMarker = findUniqueGroup(row, 4);
        iMessageMarker = findUniqueGroup(row, 14);

    });

    reader.on("close", () => {
        console.log("\n*** DAY 6  ***");
        console.log("First packet marker after character " + iMarker);
        console.log("First message marker after character " + iMessageMarker);
    });
}