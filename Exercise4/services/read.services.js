let fs = require("fs");
const readDetails = (req, res) => {

    try{
        const buddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
        res.send("File data: "+JSON.stringify(buddiesData,null,2));
    }
    catch(err){
        console.log(err);
        res.status(500).send("File cannot be found");
    }
    
 };

 const readSpecificDetailsById = (req, res) => {
    console.log("Reading specific details by id...");
    try{
        const buddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
        let id = req.params.id;
        console.log("ID: "+id);
    
        let objectIndex = buddiesData.findIndex(item => item.employeeId === id );
    
        if(objectIndex!=-1)
            res.send(buddiesData[objectIndex]);
        else{
            res.send("Buddy not found!")
        }
    }
    catch(err){
        res.status(500).send("File Not Found" +err);
    }
   
 };

 const readSpecificDetailsByRealName = (req, res) => {
    console.log("Reading specific details by real name...");
    try{
        const buddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
        let realname = req.params.realname;
        console.log("realName: "+realname);

        let objectIndex = buddiesData.findIndex(item => item.realName === realname );

        if(objectIndex!=-1)
            res.send(buddiesData[objectIndex]);
        else{
            res.send("Buddy not found!")
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("File Not Found");
    }
    
 };

module.exports = {readDetails,readSpecificDetailsById,readSpecificDetailsByRealName};