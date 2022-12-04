const fs = require('fs');
const readline = require('readline')

const rock = 1;
const paper = 2;
const cissors = 3;

let myPlayMap = {"X": rock,
                 "Y": paper,
                 "Z": cissors};

let opponentPlayMap = { "A": rock,
                        "B": paper,
                        "C": cissors }

let desiredOutcomeMap = {"X": "lose",
                         "Y": "draw",
                         "Z": "win"};

choosePlay = function(opponent, outcome) {

    if ( desiredOutcomeMap[outcome] === "draw" ) {
        return opponent; //same hand as opponent for a draw
    } else if (desiredOutcomeMap[outcome] === "win"){
        if (opponent === rock) return paper;
        if (opponent === paper) return cissors;
        if (opponent === cissors) return rock;
    } else {
        if (opponent === rock) return cissors;
        if (opponent === paper) return rock;
        if (opponent === cissors) return paper;
    }
}

calculatePlayScore = function(myPlay, opponentPlay) {
    let outcome = myPlay - opponentPlay;
    let outcomePoints = 0;

    if (outcome === 0 )
        outcomePoints = 3; //draw

    else if ( outcome === 1 ||
                outcome === -2 ) {
        outcomePoints = 6; //victory
    }
    return outcomePoints + myPlay;
}


exports.run = function() {
    

    const stream = fs.createReadStream("day2/input.txt");
    //const stream = fs.createReadStream("day2/example.txt");
    const reader = readline.createInterface({ input: stream });

    let totalScore = 0;

    reader.on("line", row => {
        let play = row.split(" ");
        let opponentPlay = opponentPlayMap[play[0]];
        let myPlay = choosePlay(opponentPlay, play[1]);
        let playScore = calculatePlayScore(myPlay, opponentPlay);
        totalScore += ( playScore );
    });

    reader.on("close", () => {
        console.log("\n*** DAY 2  ***");
        console.log("Rock, Paper, Cissors total Score: " + totalScore);
    });

}