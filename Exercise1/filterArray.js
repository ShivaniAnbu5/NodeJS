function filterArray(filterArray) {
    const set = new Set();

    while(set.size !=5 ){ 
        set.add(Math.floor(Math.random() * (185 - 142) + 142));
    }

    const colorCodes = [];
    set.forEach(element => {

        filterArray.forEach(colorCode => {
            if(element == colorCode.id){
                colorCodes.push(colorCode);
            }
                
        });
    });

   return colorCodes;
    
}

module.exports = filterArray;