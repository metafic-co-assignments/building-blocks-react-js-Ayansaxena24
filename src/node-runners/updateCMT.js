var http = require('follow-redirects').http;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'cmt-prd-east.us-east-1.elasticbeanstalk.com',
  'path': '/api/v1/mobile_ide_url_settings',
  'headers': {
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var GIT_LAB_ID = 0
var GIT_BRANCH = "master"
var SHA = "0"

if ( process.argv.length === 5 ) {
  GIT_LAB_ID=parseInt(process.argv[2]);
  GIT_BRANCH=process.argv[3];
  SHA=process.argv[4];
} else {
  console.log("Incorrect number of parameters")
  process.exit(0);
}

URL_PREFIX= `https://bx-bb-mobile-wrappers.s3-us-west-1.amazonaws.com/${GIT_LAB_ID}/${GIT_BRANCH}/${SHA}`
var postData = JSON.stringify({"mobile_ide_url_setting":{"gitlab_project_id":GIT_LAB_ID,"android_app_location":`${URL_PREFIX}_Android_debug.apk`,"ios_app_location":`${URL_PREFIX}_iOS_debug.zip`}});

req.write(postData);

req.end();
