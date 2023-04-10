const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {errorLogger} = require("../utils/logger");
const {readFile} = require('../utils/fileActions');

const loginUser = async(req,res)=>{
    try{
        console.log("Inside login controller");
        let data = req.body;
        let username = data.username;
        let userData = await readFile("data/user_auth_data.json","utf-8");
        let objectIndex = userData.findIndex(item => item.username === data.username);

        if(objectIndex!= -1){
            bcrypt
                .compare(data.password, userData[objectIndex].password)
                .then(response => {
                    if(response){
                        const token = jwt.sign(
                            {username},
                            process.env.TOKEN_KEY,
                            {
                              expiresIn: "30m",
                            }
                          );
                        res.send("User logged in!\nToken: " +token);
                    }
                    else{
                        res.status(401).send("Wrong password!")
                    }
                })
                .catch(err => {
                    res.send(err.message);
                }    
            );
            
        }
        else{
            res.send("User not found.Please register!")
        }
    }
    catch(err){
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send(err);
    }
}

module.exports = {loginUser};