const {readFile} = require('fs');

// Reads from a json file
const readJsonFile = (path, type) => new Promise((resolve, reject) => {
    readFile(path, type, (err, file) => {
      if (err) reject(err)
      resolve(file)
    })
  })

module.exports = readJsonFile;