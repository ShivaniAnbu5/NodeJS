let fs = require("fs");
const jwt = require('jsonwebtoken');
let {errorLogger} = require('../utils/logger');
let services = require('../services/tasksServices');
const {readFile} = require('../utils/fileActions');

const createDetails = async(req, res) => {
        let token;
        try{
            let userData = await readFile("data/user_auth_data.json","utf-8");
            try{
                if(req.headers.authorization != null){
                    token = req.headers.authorization.split(" ")[1];
                    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                    let objectIndex = userData.findIndex(item => item.username === decoded.username);
        
                    if(objectIndex!=-1){
                        services.createDetailsService(req,res,decoded.username);
                    }
                    else{
                        res.send("User authentication failed!");
                    }
                }
                else{
                    res.send("Token not found");
                }  
            }
            catch(err){
                console.log(err);
                errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.send("Token expired..Please login again!");
            }
        }
        catch(err){
            console.log(err);
            errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(404).send("File Not Found");
        }
 };

const readDetails = async(req, res) => {
    console.log("inside read controller");
    let token;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        try{
            if(req.headers.authorization != null){
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                let objectIndex = userData.findIndex(item => item.username === decoded.username);
    

            if(objectIndex!=-1){
                    services.readDetails(req,res,decoded.username);         
            }
            else{
                res.send("User authentication failed!");
            }
         }
         else{
            res.send("Token not found");
            }  
        }
        catch(err){
            console.log(err);
            errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.send("Token expired..Please login again!");
        }
    }

    catch(err){
        console.log(err);
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File Not Found");
    }

   
 };

 const readSpecificDetailsById = async(req, res) => {
    let token;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        try{
            if(req.headers.authorization != null){
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                let objectIndex = userData.findIndex(item => item.username === decoded.username);

                if(objectIndex!=-1){
                    let id = req.params.id;
                    if(isNaN(id)){
                        res.send("Please enter a valid numeric id");
                    }
                    else{
                        services.readSpecificDetailsById(req,res,decoded.username);
                    }
                }
                else{
                    res.send("User authentication failed!");
                }
            }
            else{
                res.send("Token not found");
            }  
        }
        catch(err){
            console.log(err);
            errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.send("Token expired..Please login again!");
        }
    }
    catch(err){
        console.log(err);
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File Not Found");
    }

 };

 const updateDetailsById = async(req, res, err) => {
    console.log("inside update by id");
    let token;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        try{
            if(req.headers.authorization != null){
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                let objectIndex = userData.findIndex(item => item.username === decoded.username);

                if(objectIndex!=-1){
                    let id = req.params.id;
                    if(isNaN(id)){
                        res.send("Please enter a valid numeric id");
                    }
                    else{
                        services.updateDetailsByIdService(req,res,decoded.username); 
                    }
                }
                else{
                    res.send("User authentication failed!");
                }
            }
            else{
                res.send("Token not found");
            }  
        }
        catch(err){
            console.log(err);
            errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.send("Token expired..Please login again!");
        }
    }
    catch(err){
        console.log(err);
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File Not Found");
    }
    
 };

 const deleteDetails = async(req,res) => {
    console.log("inside delete");
    let token;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        try{
            if(req.headers.authorization != null){
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                let objectIndex = userData.findIndex(item => item.username === decoded.username);


                if(objectIndex!=-1){
                    services.deleteDetails(decoded.username);
                }
                else{
                    res.send("User authentication failed!");
                }
             }
            else{
                res.send("Token not found");
            }  
        }
        catch(err){
            console.log(err);
            errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.send("Token expired..Please login again!");
        }
    }
    catch(err){
        console.log(err);
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File Not Found");
    }
}

const deleteDetailsById = async(req, res) => {
    console.log("inside delete by id");
    let token;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        try{
            if(req.headers.authorization != null){
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                let objectIndex = userData.findIndex(item => item.username === decoded.username);

                if(objectIndex!=-1){

                    let id = req.params.id;
                    if(isNaN(id)){
                        res.send("Please enter a valid numeric id");
                    }
                    else{
                        services.deleteDetailsById(req,res,decoded.username); 
                    }
                }
                else{
                    res.send("User authentication failed!");
                }
            }
            else{
                res.send("Token not found");
            }  
        }
        catch(err){
            console.log(err);
            errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.send("Token expired..Please login again!");
        }
    }
    catch(err){
        console.log(err);
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send("File Not Found");
    }
    
 };


module.exports = {createDetails,readDetails,readSpecificDetailsById,updateDetailsById,deleteDetails,deleteDetailsById};
