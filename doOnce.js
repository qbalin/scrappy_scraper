#!/usr/bin/env node

const fs = require("fs");
const statusFilePath = `${__dirname}/status.txt`;

module.exports = fn =>
  new Promise((resolve, reject) => {
    fs.readFile(statusFilePath, "utf8", function(err, data) {
      if (err) {
        console.log("error: failed to read status file", err);
        return reject(err);
      }

      if (data === "0") {
        fs.writeFile(statusFilePath, "1", function(err) {
          if (err) {
            console.log("error: failed to write to status file", err);
            return reject(err);
          }

          fn();
        });
      }
    });
  });
