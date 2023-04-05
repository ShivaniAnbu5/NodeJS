const {readFileSync} = require("fs");

const fs = require('fs');

// Reads from a json file
const readJsonFile = (path, type) => new Promise((resolve, reject) => {
    fs.readFile(path, type, (err, file) => {
      if (err) reject(err)
      resolve(file)
    })
  })

module.exports = readJsonFile;