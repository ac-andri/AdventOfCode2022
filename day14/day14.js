const fs = require('fs');
const readline = require('readline');

exports.run = function () {

    const stream = fs.createReadStream("day14/input.txt");
    //const stream = fs.createReadStream("day14/example.txt");
    const reader = readline.createInterface({ input: stream });

    reader.on("line", row => {
    });

    reader.on("close", () => {
        console.log("\n*** DAY 14 ***");
        console.log('solution in browser');
    });
}