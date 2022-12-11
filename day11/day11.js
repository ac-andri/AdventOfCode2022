const fs = require('fs');
const readline = require('readline');


Monkey = function () {
    return {
        sMonkeyId: '',
        aItems: [],
        aMonkeys: [],
        sOperation: [],
        sOperand: 0,
        iDivisibleBy: 0,
        aTargets: [],
        iInspectionCount: 0,

        performOperation: function (item) {
            if (this.sOperand == 'old') {
                op = item;
            } else {
                op = this.sOperand;
            }

            if (this.sOperation == '+')
                return item + op;
            else if (this.sOperation == '-')
                return item - op;
            else if (this.sOperation == '/')
                return item / op;
            else if (this.sOperation == '*')
                return item * op;
        },

        test: function (item) {
            if (item % this.iDivisibleBy == 0) {
                return true;
            }
            return false;
        },

        addItem: function (item) {
            this.aItems.push(item);
        },


        inspect: function () {
            let iCount = this.aItems.length;
            for (let i = 0; i < iCount; i++) {
                this.iInspectionCount++;
                let item = this.aItems.shift(1);
                item = this.performOperation(item);
                item = Math.floor(item / 3);
                if (this.test(item)) {
                    let = target = this.aTargets[0];
                } else {
                    target = this.aTargets[1];
                }
                this.aMonkeys[target].addItem(item);
            }
        }
    }
}

let aMonkeys = [];
exports.run = function () {

    const stream = fs.createReadStream("day11/input.txt");
    //const stream = fs.createReadStream("day11/example.txt");
    const reader = readline.createInterface({ input: stream });

    let oMonkey = null;

    reader.on("line", row => {
        let match = [];
        if (match = row.match(/Monkey ([0-9]+):/)) {
            oMonkey = new Monkey();
            aMonkeys.push(oMonkey);
            oMonkey.aMonkeys = aMonkeys;
            oMonkey.sMonkeyId = match[1];
        } else if (match = row.match(/Starting items: (.+)/)) {
            match[1].split(', ').forEach(e => {
                oMonkey.addItem(parseInt(e));
            });
        } else if (match = row.match(/Operation: new = old (.) ([0-9a-z]+)/)) {
            oMonkey.sOperation = match[1];
            if (match[2] == 'old') {
                oMonkey.sOperand = match[2];
            } else {
                oMonkey.sOperand = parseInt(match[2]);
            }
        } else if (match = row.match(/Test: divisible by ([0-9]+)/)) {
            oMonkey.iDivisibleBy = parseInt(match[1]);
        } else if (match = row.match(/If [a-z]+: throw to monkey ([0-9]+)/)) {
            oMonkey.aTargets.push(parseInt(match[1]));
        }
    });

    reader.on("close", () => {
        console.log("\n*** DAY 11 ***");

        for (let i = 0; i < 20; i++) {
            //console.log('round', (i + 1));

            aMonkeys.forEach(monkey => {
                monkey.inspect();
            });

            if (i == 1000){
            aMonkeys.forEach(monkey => {
                console.log(monkey.aItems.join(', '));
            });
            }

        }

        let top = [];
        aMonkeys.forEach(e => {
            top.push(e.iInspectionCount);
        });
        top = top.sort(function(a, b){return a - b});

        console.log("Top monkey business: " + (top.at(-1) * top.at(-2)));

    });
}