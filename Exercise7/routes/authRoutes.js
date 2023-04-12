const express = require('express')
const router = express.Router();

const controller = require("../controllers/authController");

router.get('/register',controller.registerUser);

router.get('/login',controller.loginUser);


module.exports = router;