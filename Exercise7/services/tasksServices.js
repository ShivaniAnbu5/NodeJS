const fileActions = require('../utils/fileActions');

const createDetailsService = async(taskData,userIndex) => {   
    let response;
    try{
        let tasksData = await fileActions.readFile("data/user_tasks_data.json","utf-8");
        tasksData[userIndex].taskCount++;
        let taskCount = tasksData[userIndex].taskCount;
        tasksData[userIndex].tasks.push({taskData,createdDate:new Date(),taskId: taskCount});
        fileActions.writeFile("data/user_tasks_data.json",tasksData);
        response ={status:true,message:"Created task"};  
    } 
    catch(err){
        response={status:false,message:"Error occured in creating task"};
    }
    return response;
}

const readDetails = async(userIndex) => {
    let response;
    try{
        console.log("dd");
        let tasksData = await fileActions.readFile("data/user_tasks_data.json","utf-8");
        if(tasksData[userIndex].tasks.length>0)
        {
            response = {status:true,message : tasksData[userIndex].tasks};  
        }
        else{
            response = {status:true,message:"No tasks added yet!"};
        }
    }
    catch(err){
        response={status:false,message:"Error occured in reading tasks"};
    }
    return response;
    
 };

const readSpecificDetailsById = async(userIndex,id) => {
    let response;
    try{
        let tasksData = await fileActions.readFile("data/user_tasks_data.json","utf-8");
        let taskIndex = (tasksData[userIndex].tasks).findIndex(item => item.taskId == id)
        if(taskIndex!=-1){
            response = {status:true,message : tasksData[userIndex].tasks[taskIndex]}; 
        }
        else{
            response = {status:true,message:"Task with id "+id+" could not be found!"};
        }
    }
    catch(err){
        response={status:false,message:"Error occured in reading specific task by id"};
    }
    return response;
 };


const updateDetailsByIdService = async(taskData,userIndex,id) => {
    let response;
    try{
        let tasksData = await fileActions.readFile("data/user_tasks_data.json","utf-8");
        let taskIndex = (tasksData[userIndex].tasks).findIndex(item => item.taskId == id);
        let task = tasksData[userIndex].tasks[taskIndex];
        if(taskIndex!=-1)
        {
            Object.keys(task.taskData).forEach((key) => (task.taskData[key] = taskData.hasOwnProperty(key) ? taskData[key] : task.taskData[key]));
            await fileActions.writeFile("data/user_tasks_data.json",tasksData);
            response = {status:true,message:"Task with id "+id+" updated successfully"};
        }
        else{
            response = {status:true,message:"Task with id "+id+" could not be found!"};
        }
    }
    catch(err){
        console.log(err);
        response={status:false,message:"Error occured in updating specific task by id"};
    }
    return response;
 };

const deleteDetailsById = async(userIndex,id) => {
    let response;
    try{
        let tasksData = await fileActions.readFile("data/user_tasks_data.json","utf-8");
        let taskIndex = (tasksData[userIndex].tasks).findIndex(item => item.taskId == id);
        if(taskIndex!=-1)
        {
            tasksData[userIndex].tasks.splice(taskIndex,1);
            await fileActions.writeFile("data/user_tasks_data.json",tasksData);
            response = {status:true,message:JSON.stringify(tasksData)};
        }
        else{
            response = {status:true,message:"Task with id "+id+" could not be found!"};
        }
    }
    catch(err){
        console.log(err);
        response={status:false,message:"Error occured in deleting specific task by id"};
    }
    return response;
};

const filterTasks = async(queryDetails,userIndex)=>{
    let response;
    try{
        let tasksData = await fileActions.readFile("data/user_tasks_data.json","utf-8");
        const {title,priority,dueDate} = queryDetails;
        let data;
        if(title){
            data = tasksData[userIndex].tasks.filter((task)=>{
                return task.taskData.title == title;
            })
        }
        if(priority){
            data = tasksData[userIndex].tasks.filter((task)=>{
                return task.taskData.priority == priority;
            });
        }
        if(dueDate){
            data = tasksData[userIndex].tasks.filter((task)=>{
                return task.taskData.dueDate == dueDate;
            })
        }
        response = data.length>0 ? {status:true,message:data} : {status:true,message:"No results"};
    }
    catch(err){
        response={status:false,message:"Error occured in filtering tasks"};
    }
    return response;
}

const sortTasks = async(queryDetails,userIndex)=>{
    let response;
    try{
        let tasksData = await fileActions.readFile("data/user_tasks_data.json","utf-8");
        const value = queryDetails.sortvalue;
        let data = tasksData[userIndex].tasks;
        if(value=="title"){
            data.sort(function(data1,data2){
                let title1 = data1.taskData.title;
                let title2 = data2.taskData.title;
                if (title1 < title2) {
                    return -1;
                }
                if (title1 > title2) {
                    return 1;
                }
                return 0;
            });
        }
        if(value=="priority"){
            const priorities = {
                low : 0,
                medium : 1,
                high : 2
            }
            data.sort(function(data1,data2){
                let priority1 = priorities[data1.taskData.priority];
                let priority2 = priorities[data2.taskData.priority];
                if (priority1 < priority2) {
                    return -1;
                }
                if (priority1 > priority2) {
                    return 1;
                }
                return 0;
            });
        }
        if(value=="dueDate"){
            data.sort(function(data1,data2){
                let dueDate1 = new Date(data1.taskData.dueDate);
                let dueDate2 = new Date(data2.taskData.dueDate);
                if (dueDate1 < dueDate2) {
                    return -1;
                }
                if (dueDate1 > dueDate2) {
                    return 1;
                }
                return 0;
            });
        }
        response = {status:true,message:data};
    }
    catch(err){
        response={status:false,message:"Error occured in sorting tasks"};
    }
    return response;
}

const paginateTasks = async(queryDetails,userIndex)=>{
    let response;
    try{
        let tasksData = await fileActions.readFile("data/user_tasks_data.json","utf-8");
        const {filter,sort,limit} = queryDetails;
        let data = tasksData[userIndex].tasks;
        let returnedData;
        if(filter){
            returnedData= await filterTasks(queryDetails,userIndex);
        }  else returnedData = data;
        if(sort){
            returnedData= await sortTasks(queryDetails,userIndex);
        }
        if(returnedData.length < limit){
            response = {status:true,message:returnedData.message};
        }
        else{
           
            returnedData = returnedData.message.slice(0,limit);
            response = {status:true,message : returnedData};
        }
    }
    catch(err){
        console.log(err);
        response={status:false,message:"Error occured in paginating tasks"};
    }
    return response;
}

module.exports = {createDetailsService,readDetails,readSpecificDetailsById,updateDetailsByIdService,deleteDetailsById,filterTasks,sortTasks,paginateTasks};
