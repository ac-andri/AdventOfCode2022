const fs = require('fs');
const readline = require('readline')


//Compare two or more strings and find the common characters
findCommon = function (aRows) {
    let common = {};
    for (let i = 0; i < aRows.length - 1; i++) {
        const stringA = aRows[i];
        const stringB = aRows[i + 1];

        let interCommon = {};
        for (let j = 0; j < stringA.length; j++) {
            if (stringB.search(stringA[j]) >= 0) {
                if (!interCommon[stringA[j]]) {
                    interCommon[stringA[j]] = 1;
                }
            }
        }

        for (const key in interCommon) {
            if (Object.hasOwnProperty.call(interCommon, key)) {
                if (!common[key]) {
                    common[key] = 1;
                } else {
                    common[key] += 1;
                }
            }
        }
    }

    let output = []
    for (const key in common) {
        if (Object.hasOwnProperty.call(common, key)) {
            const e = common[key];
            if (e == aRows.length - 1) {
                output.push(key)
            }
        }
    }

    return output;

}

countScore = function (aCommon) {
    let sumScore = 0
    aCommon.forEach(element => {
        let prioScore = element.charCodeAt(0) - 96;
        if (prioScore < 0) {
            prioScore += 58; //compensate for upper case
        }
        sumScore += prioScore;
    });
    return sumScore;
}

exports.run = function () {

    const stream = fs.createReadStream("day3/input.txt");
    //const stream = fs.createReadStream("day3/example.txt");
    const reader = readline.createInterface({ input: stream });

    let totalPriority = 0;

    let elfGroups = [];
    let elfGroup = [];
    reader.on("line", row => {

        aCommon = findCommon([row.substring(0, row.length / 2),
        row.substring(row.length / 2, row.length)]);

        let score = countScore(aCommon);
        totalPriority += score;

        //group in threes for part2
        elfGroup.push(row);
        if (elfGroup.length == 3) {
            elfGroups.push(elfGroup);
            elfGroup = [];
        }
    });

    reader.on("close", () => {
        console.log("\n*** DAY 3  ***");
        console.log("Packing prio score is: " + totalPriority);

        let groupScore = 0
        elfGroups.forEach(eg => {
            let aCommon = findCommon(eg);
            let score = countScore(aCommon);
            groupScore += score;
        });
        console.log("Group packing prio score is: " + groupScore);

    });

}