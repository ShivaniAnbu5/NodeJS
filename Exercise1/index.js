let fs = require("fs");
let http = require("http");

        let readColorCodesFromJson = require("./readFile");
        let colorCodes = JSON.parse(readColorCodesFromJson("color_palette.json"));

       if(colorCodes!=null){
           let shuffle = require("./shuffleArray");
           var shuffledArray = shuffle(colorCodes);
   
           let writeFile = require("./writeFile");
           writeFile(shuffledArray);
   
           let randomColorCodes = JSON.parse(readColorCodesFromJson("randomized_color_ palette.json"));
   
           console.log(randomColorCodes);
       }
       else{
        console.log("Couldn't complete the process")
       }