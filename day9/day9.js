const { deepStrictEqual } = require('assert');
const fs = require('fs');
const readline = require('readline');



step = function (oHead, oTail) {

    let xDelta = oHead.x - oTail.x;
    let yDelta = oHead.y - oTail.y;

    if (Math.abs(xDelta) <= 1 &&
        Math.abs(yDelta) <= 1) {
        return;
    } else if ( Math.abs(xDelta) > 1) {
        oTail.x = oHead.x - (Math.sign(xDelta));
        oTail.y = oHead.y;
    } else if ( Math.abs(yDelta) > 1) {
        oTail.y = oHead.y - (Math.sign(yDelta));
        oTail.x = oHead.x;
    }

}

exports.run = function () {

    const stream = fs.createReadStream("day9/input.txt");
    //const stream = fs.createReadStream("day9/example.txt");
    const reader = readline.createInterface({ input: stream });

    let oVisited = new Set();
    let oHeadPos = { x: 0, y: 0 };
    let oTailPos = { x: 0, y: 0 };

    reader.on("line", row => {
        let aAction = row.split(' ');
        let sDirection = aAction[0];
        let iSteps = parseInt(aAction[1]);

        let dir = 1;
        if (sDirection == 'D' || sDirection == 'L') {
            dir = -1;
        }

        for (let i = 0; i < iSteps; i++) {

            //move head one direction
            if (sDirection == 'U' || sDirection == 'D') {
                oHeadPos.y += dir;
            } else {
                oHeadPos.x += dir;
            }

            step(oHeadPos, oTailPos);
            //oVisited.add([oTailPos.x, oTailPos.y]);
            oVisited.add(`x${oTailPos.x}y${oTailPos.y}`);

        }

        console.log(row);
        //oVisited.add(`x${oTailPos.x}y${oTailPos.y}`);

        console.log('Head', oHeadPos.x, ',', oHeadPos.y);
        console.log('Tail', oTailPos.x, ',', oTailPos.y);


    });

    reader.on("close", () => {
        console.log("\n*** DAY 9  ***");
        console.log('Tail visided location count: '+ oVisited.size );
    });
}