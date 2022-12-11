const fs = require('fs');
const readline = require('readline');

exports.run = function () {

    const stream = fs.createReadStream("day10/input.txt");
    //const stream = fs.createReadStream("day10/example.txt");
    const reader = readline.createInterface({ input: stream });

    let aInstrBuffer = [];

    reader.on("line", row => {

        let instr = row.split(' ');
        let op = instr[0];
        let param = parseInt(instr[1]);

        aInstrBuffer.push(0);
        if (op == 'addx'){
            aInstrBuffer.push(param);
        } 
    });

    reader.on("close", () => {
        console.log("\n*** DAY 10 ***");

        let iRegister_x = 1;
        let iSignalStrength = 0;
        let crt = [];
        let currentpixel = 0;

        for (let cycle = 1; cycle <= aInstrBuffer.length; cycle++) {
            const param = aInstrBuffer[cycle-1];
            
            if (Math.abs(iRegister_x - currentpixel) <= 1) {
                crt.push('#');
            } else {
                crt.push('.');
            }

            if ((cycle + 20) % 40 == 0) {
                let strength = (cycle * iRegister_x);
                iSignalStrength += strength;
                //console.log('Cycle: ', cycle, '*', iRegister_x, ' strength: ', strength,' sum: ', iSignalStrength);
            }
            iRegister_x += param;
            currentpixel++;
            currentpixel = currentpixel % 40;
        }
        
        console.log('Signal strength sum :' + iSignalStrength);
        
        for (let i = 0; i < crt.length; i += 40) {
            console.log( crt.slice(i,i+39).join('') );
            
        }
    });
}