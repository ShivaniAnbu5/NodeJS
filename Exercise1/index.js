let fs = require("fs");
let http = require("http");

        let readColorCodesFromJson = require("./readFile");
        let colorCodes = readColorCodesFromJson("color_palette.json");
       
        if(colorCodes!=null){
           let filterArray = require("./filterArray");
           var filteredArray = filterArray(colorCodes);
   
           let writeFile = require("./writeFile");
           writeFile(filteredArray);
   
           let randomColorCodes = readColorCodesFromJson("randomized_color_ palette.json");
   
           console.log(JSON.stringify(randomColorCodes,null,2));
       }
       else{
        console.log("Couldn't complete the process");
       }