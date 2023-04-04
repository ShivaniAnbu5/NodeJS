let fs = require("fs");

const writeToJsonFile = (filteredArray) => {
    fs.writeFileSync("randomized_color_ palette.json",JSON.stringify(filteredArray));
}

module.exports = writeToJsonFile;
