let fs = require("fs");
let logger = require('../logger');
let services = require('../services/buddiesServices');
const STATUS = require('../constants/statusConstants');

//CALLS THE CREATE DETAILS SERVICE AND THEN SENDS BACK THE RESPONSE
const createDetails = (req, res) => {
    try{
        let response = services.createDetailsService(req.body);
        res.status(201).send(response);
    }
    catch(err){
        console.log("Error: "+err);
        logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(STATUS.FILE_NOT_FOUND);
    }
    
 };

 //CALLS THE READ DETAILS SERVICE AND THEN SENDS BACK THE RESPONSE
 const readDetails = (req, res) => {
    try{
        let response = services.readDetails();
        res.send(response);
    }
    catch(err){
        console.log("Error: "+err);
        logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(STATUS.FILE_NOT_FOUND);
    }
 };
 
//CALLS THE READ DETAILS BY ID OR NAME SERVICE AND THEN SENDS BACK THE RESPONSE
 const readSpecificDetailsByIdOrName = (req, res) => {
    let response;
    try{
        let value = req.params.value;
        if(isNaN(value)){
            response = services.readSpecificDetailsByRealName(value);
        }
        else{
            response = services.readSpecificDetailsById(value);
        }
        res.send(response);
    } 
    catch(err){
        logger.error(`${err.status } - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(STATUS.FILE_NOT_FOUND);
    }
 };

 //CALLS THE UPDATE DETAILS BY ID SERVICE AND THEN SENDS BACK THE RESPONSE
const updateDetailsById = (req, res) => {
    let response;
    try{
        let id = req.params.id;
        if(isNaN(id)){
            response = "Please enter a valid numeric id";
        }
        else{
            response = services.updateDetailsByIdService(req.body,id);    
        }
        res.send(response);
    }
    catch(err){
        logger.error(`${err.status} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(STATUS.FILE_NOT_FOUND);
    }   
 };

//CALLS THE DELETE DETAILS SERVICE AND THEN SENDS BACK THE RESPONSE
const deleteDetails = (req,res) => {
    let response;
    try{
        response = services.deleteDetails();
    }
    catch(err){
        logger.error(`${err.status } - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(STATUS.FILE_NOT_FOUND);
    }
    res.send(response);
}

//CALLS THE DELETE DETAILS BY ID SERVICE AND THEN SENDS BACK THE RESPONSE
const deleteDetailsById = (req, res) => {
    let response;
    try{
        let id = req.params.id;
        if(isNaN(id)){
            response = "Please enter a valid numeric id";
        }
        else{
            response = services.deleteDetailsById(id);
            
        }
        res.send(response);
    }
    catch(err){
        logger.error(`${err.status } - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(404).send(STATUS.FILE_NOT_FOUND);
    }
 };

module.exports = {createDetails,readDetails,readSpecificDetailsByIdOrName,updateDetailsById,deleteDetails,deleteDetailsById};