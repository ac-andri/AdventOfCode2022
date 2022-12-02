const fs = require('fs');

exports.run = function() {

    console.log("*** DAY 1  ***")
    fs.readFile('day1/input.txt', 'utf-8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }

        //console.log(data);
        aCalories = data.split('\n');
        aTotalCal = [];
        iCalSum = 0;
        iCalorie = 0;
        aCalories.forEach(element => {
            iCalorie = parseInt(element)
            if (isNaN(iCalorie)){
                aTotalCal.push(iCalSum);
                iCalSum = 0;
            } else {
                iCalSum = iCalSum + iCalorie;
            }
        });

        //console.log(aTotalCal);

        aTotalCal = aTotalCal.sort();

        console.log("Top Elf calories: " + aTotalCal[ aTotalCal.length -1 ]);

        iTopThree = 0;
        for (let i = aTotalCal.length-1; i >= aTotalCal.length-3; i-- ) {
            //console.log(aTotalCal[i]);
            iTopThree = iTopThree  + aTotalCal[i];
        }

        console.log("Top 3 Elves have together calories: " + iTopThree);
    });

}