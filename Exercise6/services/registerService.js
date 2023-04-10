const fs = require('fs');
const jwt = require('jsonwebtoken');
const {errorLogger} = require("../utils/logger");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {readFile,writeFile} = require('../utils/fileActions')
const registerUser = async(req,res)=>{
    try{
        console.log("Inside register controller");
        let data = req.body;
        let username = data.username;
        let userData = await readFile("data/user_auth_data.json","utf-8");
        console.log("User data "+userData);
        let userTasks = await readFile("data/user_tasks_data.json","utf-8");

        console.log("User taks "+userTasks);
        console.log("User tdedd ");

        let objectIndex = userData.findIndex(item => item.username === data.username);

        // If already a user with this username doesn't exist then add them
        if(objectIndex == -1){
            bcrypt
            .hash(req.body.password, saltRounds)
            .then(hash => {
            data.password = hash;
            userData.push(data);

            const token = jwt.sign(
                {username},
                process.env.TOKEN_KEY,
                {
                  expiresIn: "30m",
                }
              );

            let userTask = {
                username: username,
                tasks : [],
                taskCount : 0,
            }
            userTasks.push(userTask);
            writeFile("data/user_tasks_data.json",userTasks);
            writeFile("data/user_auth_data.json",userData);
            res.status(200).send("Registered successfully!\nToken:"+token);
            
            })
            .catch(err => console.error(err.message));
        }
        else{
            res.write("Username already exists");
        }  

    }
    catch(err){
        errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send(err);
    }
}

module.exports = {registerUser};