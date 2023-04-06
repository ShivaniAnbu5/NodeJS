const createService = require('../services/create.services');

const createDetails = (req, res) => {

    try{
        console.log("Inside create controller");
        createService(req,res);
    }
    catch(err){
        console.log(err);
    }
    
 };

module.exports = {createDetails};