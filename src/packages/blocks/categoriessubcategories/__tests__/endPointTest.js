const { exec } = require("child_process");
var config = require('../src/config')
var host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');

var cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.categoryAPIEndPoint} --method GET`

console.log(cmd);

exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`EndPoint Failed::${error}`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

var cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.subCategoryAPIEndPoint} --method GET`

console.log(cmd);

exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`EndPoint Failed::${error}`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

var data = JSON.stringify({
    data: {
        type: "email_account",
        attributes: {
            first_name: 'Firstname',
            last_name: 'Lastname',
            full_phone_number: '13105551212',
            email: `${Math.random().toString(36).slice(2)}@email.com`,
            password: 'pAssword123'

        }
    }
})


exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.categoryAPIEndPoint} --body '${data}'`, (error, stdout, stderr) => {
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

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.subCategoryAPIEndPoint} --body '${data}'`, (error, stdout, stderr) => {
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