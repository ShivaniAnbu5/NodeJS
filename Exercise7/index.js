const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const {infoLogger} = require("./utils/logger");

const auth = require('./routes/auth');
const tasksRoutes = require("./routes/tasksRoutes");

require('dotenv').config();

app.use(express.urlencoded( {extended:true}));

app.use(express.json());

app.use(cors());

app.use("/auth", auth);

app.use('/tasks/',tasksRoutes);

app.use("/", (req,res)=>{
  fs.writeFile("./data/user_auth_data.json" ,JSON.stringify([]) ,(err) => {
    if (err) throw err;
    console.log('File is created successfully.');
  });
  fs.writeFile("./data/user_tasks_data.json" ,JSON.stringify([]) ,(err) => {
    if (err) throw err;
    console.log('File is created successfully.');
  });
  res.send("Hello!");
});


app.listen(process.env.port,()=>{
  infoLogger.info(`Server started at port `+process.env.port);
})