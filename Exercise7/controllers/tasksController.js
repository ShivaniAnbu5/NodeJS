let fs = require("fs");
const jwt = require('jsonwebtoken');
let {logger} = require('../utils/logger');
let services = require('../services/tasksServices');
const {readFile} = require('../utils/fileActions');
const constants = require('../constants/constants');
const validate = require('../utils/validation');

const createDetails = async(req, res) => {
        let token,response={};
        try{
            let userData = await readFile("data/user_auth_data.json","utf-8");
            let tasksData = await readFile("data/user_tasks_data.json","utf-8");
            try{
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                let userIndex = userData.findIndex(item => item.username === decoded.username);
                if(userIndex!=-1){
                    let result = validate(req.body);
                    console.log("Body: "+JSON.stringify(req.body));
                    if(result){
                        response = await services.createDetailsService(req.body,userIndex);
                        if(response.status){
                            res.status(201);
                            logger.info(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        }
                        else{
                            res.status(500);
                            logger.error(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        } 
                    }
                    else{
                        response.message = "Fill all the fields";
                    }
                      
                }
                else{
                    response.message = constants.USER_AUTH_FAILED;
                    res.status(401);
                }
                res.json(response.message);
            }
            catch(err){
                logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(401).json(constants.TOKEN_EXPIRED);
            }
        }
        catch(err){
            console.log(err);
            logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(404).send(constants.FILE_NOT_FOUND);
        }
 };

const readDetails = async(req, res) => {
    let token,response;
        try{
            let userData = await readFile("data/user_auth_data.json","utf-8");
            let tasksData = await readFile("data/user_tasks_data.json","utf-8");
            try{
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                let userIndex = userData.findIndex(item => item.username === decoded.username);
                if(userIndex!=-1){
                    response = await services.readDetails(userIndex);
                    if(response.status){
                        res.status(200);
                        logger.info(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    }
                    else{
                        res.status(500);
                        logger.error(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    }            
            }
            else{
                response.message = constants.USER_AUTH_FAILED;
                res.status(401);
            }
            res.json(response.message);
        }
        catch(err){
            console.log(err);
            logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).json(constants.TOKEN_EXPIRED);
        }
    }

    catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(constants.FILE_NOT_FOUND);
    }

   
 };

 const readSpecificDetailsById = async(req, res) => {
    let token,response;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            let userIndex = userData.findIndex(item => item.username === decoded.username);
            if(userIndex!=-1){
                    let id = req.params.id;
                    if(isNaN(id)){
                        res.send("Please enter a valid numeric id");
                    }
                    else{
                        response = await services.readSpecificDetailsById(userIndex,id);
                        if(response.status){
                            res.status(200);
                            logger.info(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        }
                        else{
                            res.status(500);
                            logger.error(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        }     
                    }
                }
                else{
                    response.message = constants.USER_AUTH_FAILED;
                    res.status(401);
                }
                res.json(response.message);
        }
        catch(err){
            logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).json(constants.TOKEN_EXPIRED);
        }
    }

    catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(constants.FILE_NOT_FOUND);
    }

 };

 const updateDetailsById = async(req, res) => {
    let token,response;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            let userIndex = userData.findIndex(item => item.username === decoded.username);
            if(userIndex!=-1){
                    let id = req.params.id;
                    if(isNaN(id)){
                        res.send("Please enter a valid numeric id");
                    }
                    else{
                        response = await services.updateDetailsByIdService(req.body,userIndex,id); 
                        if(response.status){
                            res.status(200);
                            logger.info(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        }
                        else{
                            res.status(500);
                            logger.error(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        }     
                    }
                }
                else{
                    response.message = constants.USER_AUTH_FAILED;
                    res.status(401);
                }
                res.json(response.message);
        }
        catch(err){
            logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).json(constants.TOKEN_EXPIRED);
        }
    }

    catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(constants.FILE_NOT_FOUND);
    }

 };

const deleteDetailsById = async(req, res) => {
    let token,response;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            let userIndex = userData.findIndex(item => item.username === decoded.username);
            if(userIndex!=-1){
                    let id = req.params.id;
                    if(isNaN(id)){
                        res.send("Please enter a valid numeric id");
                    }
                    else{
                        response = await services.deleteDetailsById(userIndex,id); 
                        if(response.status){
                            res.status(200);
                            logger.info(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        }
                        else{
                            res.status(500);
                            logger.error(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                        }     
                    }
                }
                else{
                    response.message = constants.USER_AUTH_FAILED;
                    res.status(401);
                }
                res.send(response.message);
        }
        catch(err){
            logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).json(constants.TOKEN_EXPIRED);
        }
    }

    catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(constants.FILE_NOT_FOUND);
    }
    
 };

const filterTasks = async(req,res)=>{
    let token,response;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            let userIndex = userData.findIndex(item => item.username === decoded.username);
            if(userIndex!=-1){
                response = await services.filterTasks(req.query,userIndex); 
                if(response.status){
                    res.status(200);
                    logger.info(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }
                else{
                    res.status(500);
                    logger.error(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }     
            }
            else{
                response.message = constants.USER_AUTH_FAILED;
                res.status(401);
            }
                res.json(response.message);
        }
        catch(err){
            logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).json(constants.TOKEN_EXPIRED);
        }
    }

    catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(constants.FILE_NOT_FOUND);
    }
    
};

const sortTasks = async(req,res)=>{
    let token,response;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            let userIndex = userData.findIndex(item => item.username === decoded.username);
            if(userIndex!=-1){
                response = await services.sortTasks(req.query,userIndex); 
                if(response.status){
                    res.status(200);
                    logger.info(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }
                else{
                    res.status(500);
                    logger.error(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }     
            }
            else{
                response.message = constants.USER_AUTH_FAILED;
                res.status(401);
            }
                res.json(response.message);
        }
        catch(err){
            logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).json(constants.TOKEN_EXPIRED);
        }
    } 
    catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(constants.FILE_NOT_FOUND);
    }        
    
}

const paginateTasks = async(req,res)=>{
    let token,response;
    try{
        let userData = await readFile("data/user_auth_data.json","utf-8");
        let tasksData = await readFile("data/user_tasks_data.json","utf-8");
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            let userIndex = userData.findIndex(item => item.username === decoded.username);
            if(userIndex!=-1){
                response = await services.paginateTasks(req.query,userIndex); 
                if(response.status){
                    res.status(200);
                    logger.info(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }
                else{
                    res.status(500);
                    logger.error(`${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }     
            }
            else{
                response.message = constants.USER_AUTH_FAILED;
                res.status(401);
            }
                res.json(response.message);
        }
        catch(err){
            logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).json(constants.TOKEN_EXPIRED);
        }
    } 
    catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(constants.FILE_NOT_FOUND);
    }        
        
    
}
module.exports = {createDetails,readDetails,readSpecificDetailsById,updateDetailsById,deleteDetailsById,filterTasks,sortTasks,paginateTasks};
