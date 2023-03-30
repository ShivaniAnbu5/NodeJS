let fs = require("fs");

const writeToJsonFile = (shuffledArray) => {
    fs.writeFileSync("randomized_color_ palette.json",JSON.stringify(shuffledArray.slice(0,5)));
}

module.exports = writeToJsonFile;
