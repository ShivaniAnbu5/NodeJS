function filterArray(arrayToBeFiltered) {
    const set = new Set();

    while(set.size !=5 ){ 
        let randomNum = Math.floor(Math.random() * (185 - 142) + 142);
        let index = arrayToBeFiltered.findIndex(x => x.id === randomNum);
        set.add(arrayToBeFiltered[index]);
    }

    let colorCodes = Array.from(set);
    return colorCodes;

}
    

module.exports = filterArray;