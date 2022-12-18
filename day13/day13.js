const fs = require('fs');
const readline = require('readline');


isInOrder = function (p1, p2) {
    
    let bInOrder = null;
    for (let i = 0; i < p1.length; i++) {
        //bInOrder = true;
        let pi1 = p1[i];
        let pi2 = p2[i];
        //console.log('Compare ', JSON.stringify(pi1), ' ', JSON.stringify(pi2));
        if (pi2 == undefined || pi2 == null) {
            return false;
        }
        let newA = []
        if (Array.isArray(pi1) && !Array.isArray(pi2)) {
            newA.push(pi2);
            pi2 = newA;
        } else if (!Array.isArray(pi1) && Array.isArray(pi2)) {
            newA.push(pi1);
            pi1 = newA;
        }

        if (Array.isArray(pi1) && Array.isArray(pi2)) {
            bInOrder = isInOrder(pi1, pi2);
            if (bInOrder != null) {
                return bInOrder;
            }
        } else if (pi1 < pi2) {
            return true;
        } else if (pi1 > pi2) {
            return false;
        }
    }
    if (bInOrder == null && Array.isArray(p1) && Array.isArray(p2)) {
        if (p1.length > p2.length){
            return false;
        } else if (p1.length < p2.length) {
            return true;
        }
    }
    return bInOrder;

}

exports.run = function () {

    const stream = fs.createReadStream("day13/input.txt");
    //const stream = fs.createReadStream("day13/example.txt");
    const reader = readline.createInterface({ input: stream });

    let aPackets = [];
    let aPair = null;

    let aPart2 = [];
    let aDividerPacket1 = [[2]];
    let aDividerPacket2 = [[6]];
    aPart2.push(aDividerPacket1);
    aPart2.push(aDividerPacket2);
    reader.on("line", row => {

        if (aPackets.length == 0) {
            aPair = [];
            aPair.push(JSON.parse(row));
            aPackets.push(aPair);
        } else if (row == '') {
            aPair = [];
            aPackets.push(aPair);
            return;
        } else {
            aPair.push(JSON.parse(row));
        }

        aPart2.push(JSON.parse(row));
    });


    reader.on("close", () => {
        console.log("\n*** DAY 13 ***");

        let indexSum = 0;
        let index = 1;
        aPackets.forEach(e => {
            p1 = e[0];
            p2 = e[1];
            //console.log('\nIndex: ', index);
            //console.log(JSON.stringify(p1));
            //console.log(JSON.stringify(p2));
            
            inOrder = isInOrder(p1, p2);
            if (inOrder == true) {
               // console.log('In order: ', index);
                indexSum += index;
            } else {
                //console.log('Not in order: ', index);
            }
            index++;
        });

        console.log('Sum of indices in order: ', indexSum);


        //Part2
        aPart2.sort((a,b) => { 
            if (isInOrder(a, b) == true) return -1
            else return 1
        } );

        iPacket1 = 1;
        iPacket2 = 1;
        i = 1;
        aPart2.forEach(e => {
            //console.log(i++, ' - ',JSON.stringify(e));
            if (isInOrder(e,aDividerPacket1)){
                iPacket1++;
            }
            if (isInOrder(e,aDividerPacket2)){
                iPacket2++;
            }
        });
        console.log('Decoder key is :',iPacket1*iPacket2);
    });
}