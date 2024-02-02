const { exec } = require('child_process')
var config = require('../src/config')
var host = require('../../../framework/src/config')
  .baseURL.replace('http://', '')
  .replace('https://', '')

exec(
  `cd ../../../.. && node endPointTest.js --host ${host} --path ${config.getAdvancedSearchApiEndPoint} --method GET`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`EndPoint Failed`)
      process.exit(-1)
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  }
)
