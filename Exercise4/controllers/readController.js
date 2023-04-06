const readServices = require('../services/read.services');

const readDetails = (req, res) => {
    readServices.readDetails(req,res);
 };

const readSpecificDetailsById = (req, res) => {

    let id = req.params.id;
    if(isNaN(id)){
        res.send("Please enter a valid numeric id");
    }
    else{
        readServices.readSpecificDetailsById(req,res);
    }
 };

const readSpecificDetailsByRealName = (req, res) => {
    let name = req.params.realname;
    if(isNaN(name)){
        readServices.readSpecificDetailsByRealName(req,res);
    }
    else{
        res.send("Please enter a valid name");
    }
 };

module.exports = {readDetails,readSpecificDetailsById,readSpecificDetailsByRealName};