const express = require('express');
const fs = require('fs');
const router = express.Router();
const register = require('../services/registerService');
const login = require('../services/loginService');

router.get('/register',register.registerUser);

router.get('/login',login.loginUser);

module.exports = router;