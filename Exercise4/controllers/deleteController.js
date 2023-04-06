const deleteDetailsServices = require('../services/delete.services');

const deleteDetails = (req,res) => {
    deleteDetailsServices.deleteDetails(req,res);
}

const deleteDetailsById = (req, res) => {
    let id = req.params.id;
    if(isNaN(id)){
        res.send("Please enter a valid numeric id");
    }
    else{
        deleteDetailsServices.deleteDetailsById(req,res);
        
    }
 };

module.exports = {deleteDetails,deleteDetailsById};