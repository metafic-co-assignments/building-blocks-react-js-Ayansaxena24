const https = require('https');
const argv = require('yargs')
    .usage('Usage: node webVQANodeJS.min.js\n' +
           '            --host <host>\n' + 
           '            --path <path>\n' + 
           '            --body <data>\n' +
           '            --method <http method>\n')
    .help('help')
    .argv;  
    
var host = "";        
var path = "";
var data = "";
var httpMethod = "POST";

if (argv.host) {
    host = argv.host.replace("http://", '').replace("https://", '');
    console.log("CMD_LINE::host: " + host);
}

if (argv.body) {
    data = argv.body;
    console.log("CMD_LINE::data: " + data);
}

if (argv.path) {
    path = argv.path;
    console.log("CMD_LINE::path: " + path);
}

if (argv.method) {
    httpMethod = argv.method;
    console.log("CMD_LINE::method: " + httpMethod);
}

const options = {
    hostname: host,
    port: 443,
    path: '/' + path,
    method: httpMethod,
    rejectUnauthorized: false,
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, (res) => {

  console.log(`statusCode: ${res.statusCode}`);

  if (res.statusCode === 404 || res.statusCode >= 500) {
      console.log('EndPoint Failed');
      process.exit(res.statusCode);
  } else {
    console.log('EndPoint Passed');
    process.exit(0);
  }
});

req.on('error', (error) => {
  console.error(error);
  process.exit(error.code);
});

req.write(data);
req.end();