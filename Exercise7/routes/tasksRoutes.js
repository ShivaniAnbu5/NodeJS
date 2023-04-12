const express = require('express')
const router = express.Router();

const controller = require("../controllers/tasksController");

router.post('/task', controller.createDetails);

router.get('/task', controller.readDetails);
router.get('/task/:id', controller.readSpecificDetailsById);

router.put('/task/:id', controller.updateDetailsById);

router.delete('/task/:id', controller.deleteDetailsById);

router.get('/filter', controller.filterTasks);

router.get('/sort', controller.sortTasks);

router.get('/paginate', controller.paginateTasks);

router.use((req, res) => {
    res.status(404).send(STATUS.PAGE_NOT_FOUND);
});

module.exports = router;