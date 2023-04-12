const express = require('express');
const router = express.Router();
const controller = require("../controllers/buddiesController");
const STATUS = require('../constants/statusConstants');

router.post('/', controller.createDetails);

router.get('/', controller.readDetails);
router.get('/:value', controller.readSpecificDetailsByIdOrName);

router.put('/:id', controller.updateDetailsById);

router.delete('/:id', controller.deleteDetailsById);
router.delete('/', controller.deleteDetails);

router.use((req, res) => {
    res.status(404).send(STATUS.PAGE_NOT_FOUND);
});

module.exports = router;