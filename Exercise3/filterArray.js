const { Random } = require("random-js");
const random = new Random(); 

function filterArray(arrayToBeFiltered) {
    const set = new Set();

    while(set.size !=5 ){ 
        let randomNum = random.integer(142,185);
        let index = arrayToBeFiltered.findIndex(x => x.id === randomNum);
        set.add(arrayToBeFiltered[index]);
    }

    let colorCodes = Array.from(set);
    return colorCodes;
    
}

module.exports = filterArray;