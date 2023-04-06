let http = require("http");
let readColorCodesFromJson = require("./readFile");
let filterArray = require("./filterArray");

http.createServer((req, res, err) => {
    if(err) console.log(err);

    async function generateRandomColors(){
        let readData= await readColorCodesFromJson('color_palette.json', 'utf8');
        let filteredArray = filterArray(readData);
        console.log([...filteredArray]);
        res.write(JSON.stringify([...filteredArray],null,1));
        res.end();
     }
     
     generateRandomColors();
     
}).listen(5000);

        