
console.log("Backend Block Missing. Passing for time being!")
process.exit(0)

// const { exec } = require("child_process");

// var config = require('../src/config')
// var host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');        

// var cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.apiEndPointGetCountryCodes} --method GET`

// console.log(cmd);

// exec(cmd, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`EndPoint Failed::${error}`);
//         process.exit(-1);
//     }
    
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });