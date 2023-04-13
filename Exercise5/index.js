const express = require('express');
const routes = require('./routes/buddiesRoutes');
let app = express();

let fs = require("fs");
let cors = require('cors');
require('dotenv').config();

app.use(express.urlencoded( {extended:true}));

app.use(express.json());

app.use(cors());

app.use("/buddies", routes);

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