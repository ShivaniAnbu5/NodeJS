let fs = require('fs');
const STATUS = require('../constants/statusConstants');

// THIS FUNCTION IS USED TO CREATE A BUDDY AND ADD IT TO THE BUDDIES FILE
const createDetailsService = (buddyData) => {
    let response;  
    const buddiesData = JSON.parse(fs.readFileSync('./cdw_ace23_buddies.json'));
    let empId = buddyData.employeeId;
    let buddyIndex = buddiesData.findIndex(buddy => buddy.employeeId == empId);
    if(buddyIndex == -1){
        buddiesData.push(buddyData);
        response = STATUS.CREATED_BUDDY;
    }
    else{
        response = "Employee with id "+empId+" already exists";
    }
    
    fs.writeFileSync('./cdw_ace23_buddies.json', JSON.stringify(buddiesData, null, 2));
    return response;
}

// THIS FUNCTION IS USED TO READ ALL THE BUDDY DETAILS
 const readDetails = () => {
    let response;
    const buddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
    response = JSON.stringify(buddiesData,null,2);
    return response;
 }

 // THIS FUNCTION IS USED TO READ SPECIFIC BUDDY DETAILS BY ID
 const readSpecificDetailsById = (id) => {
    let response;
    const buddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));

    let objectIndex = buddiesData.findIndex(item => item.employeeId === id );
    if(objectIndex!=-1){
        response = buddiesData[objectIndex];
    }
    else{
        response = STATUS.BUDDY_NOT_FOUND;
    }
    return response;
 }

  // THIS FUNCTION IS USED TO READ SPECIFIC BUDDY DETAILS BY THEIR REAL NAME
 const readSpecificDetailsByRealName = (name) => {
    let response;
    const buddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
    let objectIndex = buddiesData.findIndex(item => item.realName === name );
    if(objectIndex!=-1)
       response = buddiesData[objectIndex];
    else{
        response = STATUS.BUDDY_NOT_FOUND;
    }
    return response;
}

 // THIS FUNCTION IS USED TO UPDATE SPECIFIC BUDDY DETAILS BY THEIR EMPLOYEE ID
 const updateDetailsByIdService = (data,id) => {
    let response;
    const buddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
    let objectIndex = buddiesData.findIndex(item => item.employeeId === id );
    console.log(objectIndex);
    let dataToUpdate = data;
    let buddyIndex = buddiesData.findIndex(item => item.employeeId === dataToUpdate.employeeId);
    if(objectIndex!=-1 )
    {
        if(buddyIndex==-1 || (id==dataToUpdate.employeeId)){
            Object.keys(buddiesData[objectIndex]).forEach((key) => (buddiesData[objectIndex][key] = dataToUpdate.hasOwnProperty(key) ? dataToUpdate[key] : buddiesData[objectIndex][key]));
        
            fs.writeFileSync("./cdw_ace23_buddies.json",JSON.stringify(buddiesData,null,2));
            const updatedBuddiesData = JSON.parse(fs.readFileSync("./cdw_ace23_buddies.json"));
            response = updatedBuddiesData;
        }
        else
            response = "Employee with id "+dataToUpdate.employeeId+" already exists;"   
    }
    else{
        response = STATUS.BUDDY_NOT_FOUND;
    }
    return response;
 }

 // THIS FUNCTION IS USED TO DELETE ALL BUDDY DETAILS
 const deleteDetails = () => {
    let response;
    const buddiesData = JSON.parse(fs.readFileSync("cdw_ace23_buddies.json"));
    buddiesData.splice(0);
    fs.writeFileSync("cdw_ace23_buddies.json",JSON.stringify(buddiesData));
    response = "After deleting: "+ buddiesData;
    return response;
}

 // THIS FUNCTION IS USED TO DELETE SPECIFIC BUDDY BY THEIR EMPLOYEE ID
const deleteDetailsById = (id) => {
    let response;
    const buddiesData = JSON.parse(fs.readFileSync("cdw_ace23_buddies.json"));
    let objectIndex = buddiesData.findIndex(item => item.employeeId === id );
    if(objectIndex!=-1)
    {
        buddiesData.splice(objectIndex,1);
        fs.writeFileSync("cdw_ace23_buddies.json",JSON.stringify(buddiesData,null,2));
        response = "After removing buddy with id :"+id+" "+JSON.stringify(buddiesData,null,"\t");
    }
    else{
        response = STATUS.BUDDY_NOT_FOUND;
    }
    return response;
    
 }

module.exports = {createDetailsService,readDetails,readSpecificDetailsById,readSpecificDetailsByRealName,updateDetailsByIdService,deleteDetails,deleteDetailsById};