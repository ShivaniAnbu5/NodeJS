let fs = require("fs");
let http = require("http");

http.createServer((req, res, err) => {
    if(err) console.log(err);

    let readColorCodesFromJson = require("./readFile");

    let colorCodes = JSON.parse(readColorCodesFromJson("color_palette.json"));

    if(colorCodes!=null){
        let filterArray = require("./filterArray");
        var filteredArray = filterArray(colorCodes);
        res.write(JSON.stringify(filteredArray,null,1));
       }
    else{
        console.log("Couldn't complete the process")
       }

    res.end();
    
}).listen(5000);

        