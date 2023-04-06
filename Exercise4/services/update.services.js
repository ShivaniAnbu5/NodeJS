let fs = require('fs');

const updateDetailsByIdService = (req, res) => {

    try{
        console.log("inside try");
        const buddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
        let id = req.params.id;
        let objectIndex = buddiesData.findIndex(item => item.employeeId === id );

        let dataToUpdate = req.body;

        if(objectIndex!=-1)
            {
                buddiesData[objectIndex].employeeId = dataToUpdate.employeeId;
                buddiesData[objectIndex].realName = dataToUpdate.realName;
                buddiesData[objectIndex].nickname = dataToUpdate.nickname;
                buddiesData[objectIndex].dob = dataToUpdate.dob;
                buddiesData[objectIndex].hobbies = dataToUpdate.hobbies;
            
                fs.writeFileSync("./cdw_ace23_buddies.json",JSON.stringify(buddiesData,null,2));
                const buddiesData1 = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
                res.send(buddiesData1);
    
            }
        else{
            res.status(500).send("Buddy not found!")
        }
    }
    catch(err){
        res.status(500).send("File Not Found "+err);
    }
   
 
    
 };

 module.exports = updateDetailsByIdService;