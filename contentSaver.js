#!/usr/bin/env node

const fs = require("fs");

const saveContent = async (content, timestamp) => {
    try {
        fs.writeFile(`${__dirname}/responses/response-${timestamp}.txt`,content,function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    } catch (e) {
        console.log(e.message);
    }
};

module.exports.saveContent = saveContent;
