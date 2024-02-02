#!/bin/node
const fs = require("fs");
const backEndURL = process.argv[2]

if (backEndURL && backEndURL.indexOf('http') === 0 ) {
    let template = "\"use strict\"; const baseURL = \"https://stg.builder-blocks-api.com\"; Object.defineProperty(exports, \"__esModule\", { value: true }); exports.baseURL = baseURL;"
    template = template.replace("https://stg.builder-blocks-api.com", backEndURL)
    fs.writeFileSync("../packages/framework/src/config.js", template);
    console.log("BackEnd URL Update = " + backEndURL);
} else if (backEndURL) {
    console.log("Invaild URL")
}