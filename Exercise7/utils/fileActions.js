const fs = require("fs");

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeFile = (path,data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data,null,2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Data written successfully!");
      }
    });
  });
};

module.exports = { readFile, writeFile };