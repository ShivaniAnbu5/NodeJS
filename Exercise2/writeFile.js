const {appendFileSync,writeFileSync,writeFile} = require("fs");

// Uses writeFileSync to write to a file
const writeToJsonFile = (filteredArray) => {

     writeFileSync("randomized_color_ palette.json",JSON.stringify([...filteredArray],null,2));
    

}

module.exports = writeToJsonFile;

