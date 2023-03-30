let fs = require("fs");
let http = require("http");

http.createServer((req, res, err) => {
    if(err) console.log(err);

    let readColorCodesFromJson = require("./readFile");

    let colorCodes = JSON.parse(readColorCodesFromJson("color_palette.json"));

    if(colorCodes!=null){
           let shuffle = require("./shuffleArray");
           var shuffledArray = shuffle(colorCodes);
           res.write(JSON.stringify(shuffledArray.slice(0,5),null,1));
       }
    else{
        console.log("Couldn't complete the process")
       }

    res.end();
    
}).listen(5000);

        