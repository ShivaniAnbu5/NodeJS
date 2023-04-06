const express = require('express')
const router = express.Router()

const readController = require("../controllers/readController");
router.get('/', readController.readDetails);

router.get('/name/:realname', readController.readSpecificDetailsByRealName);

router.get('/:id', readController.readSpecificDetailsById);

module.exports = router;