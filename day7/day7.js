const fs = require('fs');
const readline = require('readline');


exports.run = function () {

    const stream = fs.createReadStream("day7/input.txt");
    //const stream = fs.createReadStream("day7/example.txt");
    const reader = readline.createInterface({ input: stream });

    let dir = {};
    let path = [];
    let iDirSum = 0;
    reader.on("line", row => {

        let iSize = 0;
        
        if (match = row.match(/\$ cd ([\w\/]+)/)) {
            if (match[1] == '/') {
                path = [];
            } else {
                path.push(match[1]);
            }
            //console.log(match[1])
            return;
        } else if (match = row.match(/\$ cd \.\./)) {
            path.pop();
            return;
        } else if (match = row.match(match = row.match(/\$ ls/))) {
            return;
        } else if (match = row.match(/(\d+) [\w.0-9]+/)) {
            //console.log(row);
            iSize = parseInt(match[1]);
        } else if (match = row.match(/\$ ls/)) {

        } else {
            //console.log(row);
            return;
        }

        //if deepest path does not exist then initialize it
        if (dir[path.join('/')] == undefined){
            dir[path.join('/')] = 0;
        }
        //console.log(path.join('/'));

        for (let i = path.length; i >= 0; i--) {
            let subpath = path.slice(0,i).join('/');
            dir[subpath] += iSize;
        }
        //dir[path.join('/')] += iSize;


    });

    reader.on("close", () => {
        console.log("\n*** DAY 7  ***");

        let iRequiredSpace = 30000000 - ( 70000000 - dir[''] );
        let aPossibleDelDirSize = [];

        for (const key in dir) {
            if (Object.hasOwnProperty.call(dir, key)) {
                const iDirSize = dir[key];
                if (iDirSize <= 100000) {
                    iDirSum += iDirSize;
                }
                if (iDirSize >= iRequiredSpace){
                    aPossibleDelDirSize.push(iDirSize);
                }
                
            }
        }
        console.log('Directory sum size is :'+iDirSum);
        console.log('Used space: '+ dir[''] );
        console.log('Required space :'+iRequiredSpace);
        
        console.log('Smallest directory size for deletion: ' + aPossibleDelDirSize.sort()[0]);


    });
}