const express = require('express')
const router = express.Router();

const controller = require("../controllers/tasksController");

router.post('/task', controller.createDetails);

router.get('/task', controller.readDetails);
router.get('/task/:id', controller.readSpecificDetailsById);

router.put('/task/:id', controller.updateDetailsById);

router.delete('/task/:id', controller.deleteDetailsById);
router.delete('/task', controller.deleteDetails);

module.exports = router;