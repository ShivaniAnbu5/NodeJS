//Import the functions
let readColorCodesFromJson = require("./readFile");
let filterArray = require("./filterArray");
let writeFile = require("./writeFile");


async function generateRandomColors(){
   let readData= await readColorCodesFromJson('color_palette.json', 'utf8');
   let colorcodes = filterArray(readData);
   writeFile(colorcodes);
   readData = await readColorCodesFromJson("randomized_color_ palette.json","utf-8");
   console.log(readData);
   
}

generateRandomColors();
