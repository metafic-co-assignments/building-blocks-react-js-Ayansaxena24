Configuring the backend URL
===========================

Note
----
The below instructions are for the web frontend only.

Description
-----------
Because we re-use the same container artefact for dev, stage and production deploments, it is necessary to set the environment-specific backend URL at the time the container starts.

To do this, we run a find and replace at container init looking through the content of the **minified** `./src/packages/framework/src/config.js` file. While the content of this file is 
almost unrecognisable after minification, the string `__MARKER_FOR_BACKEND_URL_REPLACEMENT` remains unchanged, and is replaced using `sed` just prior to NginX launching.

NginX upstream containers starting from version `0.0.10` come with the `/init-with-config.sh` script, which should replace the `CMD` argument in your Dockerfile.

The script itself looks for a number of environment variables for its operation.

Required Variables
------------------

### REACT_APP_API_PATH
This is the full URL that will be written over all instances of the `__MARKER_FOR_BACKEND_URL_REPLACEMENT` variable when the application launches. If this variable is not set,
the script will exit non-zero as no change will be detected on the `main.{hash}.js` file.

Optional Variables
------------------

### HTML_DIR
Directory within the container that the NginX web-root can be found. Default is `/usr/share/nginx/html`

### JS_DIR
Directory within the NginX web-root in which static JS files can be found. Default is `./static/js`

### JS_FILE_PREFIX
Prefix for the compiled, minified javascript file within the `JS_DIR`. Default is `main`, as React
compiles the application to a file named `main.{some hash}.js`.

### STRING_FROM
The marker that is replaced by `sed` with the value of `REACT_APP_API_PATH`. Default is `__MARKER_FOR_BACKEND_URL_REPLACEMENT`.
