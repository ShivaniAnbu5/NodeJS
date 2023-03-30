let fs = require("fs");

const readJsonFile = (file) => {

    try{
       let data =  fs.readFileSync(file,"UTF-8");
       return data;
    }
    catch(err){
        console.log("File problem! "+err);
        return null;
    }
}



module.exports = readJsonFile;