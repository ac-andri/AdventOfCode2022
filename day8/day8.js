const fs = require('fs');
const readline = require('readline');


isVisible = function (x, y, aForrest) {

}


exports.run = function () {

    const stream = fs.createReadStream("day8/input.txt");
    //const stream = fs.createReadStream("day8/example.txt");
    const reader = readline.createInterface({ input: stream });

    let aForrest = [];
    let aVisibility = [];

    reader.on("line", row => {

        let aVisRow = [];
        let aTreeRow = [];
        for (let i = 0; i < row.length; i++) {
            const tree = parseInt(row[i]);
            aTreeRow.push(tree);
            aVisRow.push(-1);
        }
        aForrest.push(aTreeRow);
        aVisibility.push(aVisRow);
    });

    reader.on("close", () => {
        console.log("\n*** DAY 8  ***");

        for (let i = 0; i < aForrest.length; i++) {

            let k = aForrest[i].length - 1;
            let maxRight = -1;
            let maxLeft = -1;
            for (let j = 0; j < aForrest[i].length; j++) {

                if (maxRight < aForrest[i][j]) {
                    maxRight = aForrest[i][j];
                    aVisibility[i][j] = aForrest[i][j];
                }

                if (maxLeft < aForrest[i][k]) {
                    maxLeft = aForrest[i][k];
                    aVisibility[i][k] = aForrest[i][k];
                }
                k--;
            }
        }

        for (let i = 0; i < aForrest[0].length; i++) {

            let k = aForrest.length - 1;
            let maxTop = -1;
            let maxBottom = -1;
            for (let j = 0; j < aForrest.length; j++) {

                if (maxTop < aForrest[j][i]) {
                    maxTop = aForrest[j][i];
                    aVisibility[j][i] = aForrest[j][i];
                }

                if (maxBottom < aForrest[k][i]) {
                    maxBottom = aForrest[k][i];
                    aVisibility[k][i] = aForrest[k][i];
                }
                k--;
            }
        }

        let sVis = '';
        let iVisibleTrees = 0;
        aVisibility.forEach(e => {
            e.forEach(f => {
                if (f >= 0) {
                    iVisibleTrees++;
                }
            });
        });
        console.log('Visible trees: ' + iVisibleTrees);

        let iVisibilityScore = 0;
        let iMaxScore = 0;
        for (let i = 0; i < aForrest.length; i++) {
            const aTreeRow = aForrest[i];
            for (let j = 0; j < aTreeRow.length; j++) {
                const iTree = aTreeRow[j];


                //count left
                let iLeft = 0;
                for (let k = j - 1; k >= 0; k--) {
                    iLeft++;
                    if (aForrest[i][k] >= iTree) {
                        break;
                    }
                }

                //count right
                let iRight = 0;
                for (let k = j + 1; k < aTreeRow.length; k++) {
                    iRight++;
                    if (aForrest[i][k] >= iTree) {
                        break;
                    }
                }

                //count up
                let iUp = 0;
                for (let k = i - 1; k >= 0; k--) {
                    iUp++;
                    if (aForrest[k][j] >= iTree) {
                        break;
                    }
                }

                //count right
                let iDown = 0;
                for (let k = i + 1; k < aForrest.length; k++) {
                    iDown++;
                    if (aForrest[k][j] >= iTree) {
                        break;
                    }
                }

                iVisibilityScore = iLeft * iRight * iUp * iDown;
                if (iVisibilityScore > iMaxScore) {
                    iMaxScore = iVisibilityScore;
                }


            }
        }

        console.log('Maximum visibility score: ' + iMaxScore);


    });
}