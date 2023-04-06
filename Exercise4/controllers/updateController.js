const updateDetailsByIdService = require('../services/update.services')
const updateDetailsById = (req, res, err) => {

    let id = req.params.id;
    if(isNaN(id)){
        res.send("Please enter a valid numeric id");
    }
    else{
        updateDetailsByIdService(req,res); 
    }
    
 };

module.exports = {updateDetailsById};