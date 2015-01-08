var path = require('path');
var archive = require('../helpers/archive-helpers');
//var headers = require('./http-helpers');
// require more modules/folders here!


var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(archive.paths.list);
}

exports.handleRequest = function (request, response) {
    console.log('posted');

  if (request.method === 'OPTIONS') {
    sendResponse(response, null);

  } else if (request.method === 'POST'){
    sendResponse(response, "Hello World", 201);

  } else {
    sendResponse(response, "Not found", 404);

  }
  //res.end(archive.paths.list);
};


  // } else if (request.method === 'GET'){
  //   sendResponse(response, {'results': 'messages'});
