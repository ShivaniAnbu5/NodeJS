const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const {logger} = require("./utils/logger");

const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require("./routes/tasksRoutes");

require('dotenv').config();

app.use(express.urlencoded( {extended:true}));

app.use(express.json());

app.use(cors());

app.use("/auth", authRoutes);

app.use('/tasks',tasksRoutes);

app.use("/", (req,res)=>{
  fs.writeFile("./data/user_auth_data.json" ,JSON.stringify([]) ,(err) => {
    if (err) throw err;
  });
  fs.writeFile("./data/user_tasks_data.json" ,JSON.stringify([]) ,(err) => {
    if (err) throw err;
  });
  res.send("Hello!");
});


app.listen(process.env.port,()=>{
  logger.info(`Server started at port `+process.env.port);
})
