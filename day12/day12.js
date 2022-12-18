const fs = require('fs');
const readline = require('readline');

exports.run = function () {

    const stream = fs.createReadStream("day12/input.txt");
    //const stream = fs.createReadStream("day12/example.txt");
    const reader = readline.createInterface({ input: stream });

    reader.on("line", row => {
    });

    reader.on("close", () => {
        console.log("\n*** DAY 12 ***");
        console.log('solution in browser');
    });
}