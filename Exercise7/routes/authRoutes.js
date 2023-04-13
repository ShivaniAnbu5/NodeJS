const express = require('express')
const router = express.Router();

const controller = require("../controllers/authController");

router.get('/register',controller.registerUser);

router.get('/login',controller.loginUser);

router.use((req, res) => {
    res.status(404).send(STATUS.PAGE_NOT_FOUND);
});

module.exports = router;