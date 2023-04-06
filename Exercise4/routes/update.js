const express = require('express')
const router = express.Router()

const updateController = require("../controllers/updateController");

router.put('/:id', updateController.updateDetailsById);

module.exports = router;