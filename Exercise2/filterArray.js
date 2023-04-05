// This function selects and returns distinct 5 random objects
function filterArray(arrayToBeFiltered) {
    const set = new Set();

    arrayToBeFiltered = JSON.parse(arrayToBeFiltered);
    while(set.size !=5 ){ 
        let randomNum = Math.floor(Math.random() * (185 - 142) + 142);
        let index = arrayToBeFiltered.findIndex(x => x.id === randomNum);
        set.add(arrayToBeFiltered[index]);
    }

    let array = Array.from(set);
    return array;

}
    
module.exports = filterArray;