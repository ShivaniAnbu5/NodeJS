let fs = require("fs");

const deleteDetails = (req,res) => {

    try{
        const buddiesData = JSON.parse(fs.readFileSync("cdw_ace23_buddies.json"));
        buddiesData.splice(0);
        fs.writeFileSync("cdw_ace23_buddies.json",JSON.stringify(buddiesData));
        res.status(200).send("After deleting: "+buddiesData);
    }
    catch(err){
        console.log(err);
        res.status(500).send("File Not Found");
    }
   

}

const deleteDetailsById = (req, res) => {

    try{
        console.log("Deleting specific details by id...")
        const buddiesData = JSON.parse(fs.readFileSync("cdw_ace23_buddies.json"));
        let id = req.params.id;

        let objectIndex = buddiesData.findIndex(item => item.employeeId === id );
        if(objectIndex!=-1)
            {
                buddiesData.splice(objectIndex,1);
                fs.writeFileSync("cdw_ace23_buddies.json",JSON.stringify(buddiesData,null,2));
                res.status(200).send("After removing buddy with id :"+id+" "+JSON.stringify(buddiesData,null,"\t"));
            
            }
        else{
            res.status(500).send("Buddy not found!")
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("File Not Found");
    }
    
    
 };

module.exports = {deleteDetails,deleteDetailsById};