const express = require('express')
const router = express.Router();

const deleteController = require("../controllers/deleteController");

router.delete('/:id', deleteController.deleteDetailsById);

router.delete('/', deleteController.deleteDetails);

module.exports = router;