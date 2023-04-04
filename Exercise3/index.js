let fs = require("fs");
let http = require("http");

http.createServer((req, res, err) => {
        if(err) console.log(err);

        let readColorCodesFromJson = require("./readFile");
        let colorCodes = readColorCodesFromJson("color_palette.json");
        let parsedColorCodes = JSON.parse(colorCodes);

        if(parsedColorCodes!=null){
            let filterArray = require("./filterArray");
            let filteredArray = filterArray(parsedColorCodes);
            res.write(JSON.stringify(filteredArray,null,2));
        }
        else{
            console.log("Couldn't complete the process");
        }

        res.end();
    
}).listen(5000);