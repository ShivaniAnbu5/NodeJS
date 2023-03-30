const { Random } = require("random-js");
const random = new Random(); 

// var rn = require('random-number');
// var options = {
//   min:  142, max:  185, integer: true
// }


let fs = require("fs");
let http = require("http");

http.createServer((req, res, err) => {
        if(err) console.log(err);

        let colorCodeFile = "./color_palette.json";
        let colorCodes = fs.readFileSync(colorCodeFile,"UTF-8");
        let parsedColorCodes = JSON.parse(colorCodes);

        for(let i=0;i<5;i++){
            // let randomNum = rn(options);
            let randomNum = random.integer(142,185);
            let index = parsedColorCodes.findIndex(x => x.id === randomNum);
            // console.log("index: "+index);
            res.write(JSON.stringify(parsedColorCodes[index])+"\n");

        }
        console.log("----------------------------------------------------")
        res.end();
    
}).listen(5000);