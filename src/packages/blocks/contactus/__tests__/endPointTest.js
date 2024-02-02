const { exec } = require("child_process");
var config = require('../src/config')
var host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');

var data = JSON.stringify({
    data: {
        name: 'Firstname',
        email: `${Math.random().toString(36).slice(2)}@email.com`,
        description: "Contact description",
        phone_number: '13105551212',
    }
})

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.getContactUsAPiEndPoint} --body '${data}'`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Failed`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});


exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.getContactUsAPiEndPoint} --method GET`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Failed`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});