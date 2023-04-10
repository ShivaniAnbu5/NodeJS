let fs = require('fs');
const {readFile,writeFile} = require('../utils/fileActions');
let {errorLogger} = require('../utils/logger');

const createDetailsService = async(req,res,username) => {   
    try{
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        let taskData = req.body;
        let objectIndex = tasksData.findIndex(item => item.username === username);

        if(objectIndex!=-1){
            let taskCount = tasksData[objectIndex].taskCount;
            tasksData[objectIndex].tasks.push({taskData,createdDate:new Date(),taskId: ++taskCount});
            tasksData[objectIndex].taskCount++;
            writeFile("data/user_tasks_data.json",tasksData);
            res.send('Created task');
        }
        else{
            res.send("User not found!");
        }
    } 
    catch(err){
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File cannot be found");
    }
}


const readDetails = async(req, res, username) => {

    try{
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        let objectIndex = tasksData.findIndex(item => item.username === username);
        if(objectIndex!=-1){
            if(tasksData[objectIndex].tasks.length>0)
            {
                res.send(tasksData[objectIndex].tasks);
            }
            else{
                res.send("No tasks added yet!");
            }
        }
        else{
            res.send("User not found!");
        }
    }
    catch(err){
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File cannot be found");
    }
    
 };

 const readSpecificDetailsById = async(req, res, username) => {
    console.log("Reading specific details by id...");
    try{
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        let objectIndex = tasksData.findIndex(item => item.username === username);
        let taskIndex = (tasksData[objectIndex].tasks).findIndex(item => item.taskId == id)
    
        if(taskIndex!=-1)
            res.send(tasksData[objectIndex].tasks[taskIndex]);
        else{
            res.send("Task with id "+id+" could not be found!")
        }
    }
    catch(err){
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File Not Found");
    }
   
 };

 const updateDetailsByIdService = async(req, res, username) => {

    try{
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        let id = req.params.id;
        let objectIndex = tasksData.findIndex(item => item.username === username);
        let taskIndex = (tasksData[objectIndex].tasks).findIndex(item => item.taskId == id);
        let task = tasksData[objectIndex].tasks[taskIndex];
        let dataToUpdate = req.body;
      
        if(objectIndex!=-1 && taskIndex!=-1)
        {
            Object.keys(task.taskData).forEach((key) => (task.taskData[key] = dataToUpdate.hasOwnProperty(key) ? dataToUpdate[key] : task.taskData[key]));

            await writeFile("data/user_tasks_data.json",tasksData);
            res.send("Task with id "+id+" updated successfully");
        }
        else{
            res.send("User not found!")
        }

    }
    catch(err){
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File Not Found "+err);
    }
    
 };



 const deleteDetails = (req,res) => {

    try{
        const fileData = JSON.parse(fs.readFileSync("cdw_ace23_buddies.json"));
        fileData.splice(0);
        fs.writeFileSync("cdw_ace23_buddies.json",JSON.stringify(fileData));
        res.status(200).send("After deleting: "+fileData);
    }
    catch(err){
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }
   

}

const deleteDetailsById = (req, res) => {

    try{
        console.log("Deleting specific details by id...")
        const fileData = JSON.parse(fs.readFileSync("cdw_ace23_buddies.json"));
        let id = req.params.id;

        let objectIndex = fileData.findIndex(item => item.employeeId === id );
        if(objectIndex!=-1)
            {
                fileData.splice(objectIndex,1);
                fs.writeFileSync("cdw_ace23_buddies.json",JSON.stringify(fileData,null,2));
                res.status(200).send("After removing buddy with id :"+id+" "+JSON.stringify(fileData,null,"\t"));
            
            }
        else{
            res.status(500).send("Buddy not found!")
        }
    }
    catch(err){
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }
    
    
 };



module.exports = {createDetailsService,readDetails,readSpecificDetailsById,updateDetailsByIdService,deleteDetails,deleteDetailsById};
