const express = require('express');
const fs = require('fs');
const authServices = require('../services/authServices');

const registerUser = (req,res)=>{
    authServices.registerUser(req,res);
}

const loginUser = (req,res)=>{
    authServices.loginUser(req,res);
}

module.exports = {registerUser,loginUser};