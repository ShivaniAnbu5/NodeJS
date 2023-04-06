const express = require('express');
const app = express();
const fs = require("fs");
let createRoute = require("./routes/create");
let readRoute = require("./routes/read");
let updateRoute = require("./routes/update");
let deleteRoute = require("./routes/delete");
require('dotenv').config();

app.use(express.urlencoded( {extended:true}));

app.use(express.json());

// C) Create a POST Request to add new buddy information to the existing list
app.use("/create",createRoute);

// A) Create a GET Request to list all the buddy's information
// B) Create a GET Request to list a single buddy's information using his employeeId/realName
app.use("/read", readRoute);

// D) Create a PUT Request to update the existing buddy information like nickname, hobbies
app.use("/update", updateRoute);

// E) Create a DELETE Request to delete an existing buddy
app.use("/delete", deleteRoute);

app.use("/", (req,res)=>{
  res.send("Hello!");
  fs.writeFile("cdw_ace23_buddies.json" ,JSON.stringify([]) ,(err) => {
    if (err) throw err;
    console.log('File is created successfully.');
  });
});

app.listen(process.env.port,()=>{
    console.log("Server started at "+process.env.port);
})