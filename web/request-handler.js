var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!


exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers.headers);
  response.end(data);
};

var collectData = function (request, callback){
  var message = '';
  request.on('data', function (chunk) {
    message += chunk;
  });
  request.on('end', function(){
    callback(message);
  });
};

exports.handleRequest = function (request, response) {
    console.log('posted');

  if (request.method === 'OPTIONS') {
    exports.sendResponse(response, null);

  } else if (request.method === 'GET'){
    var urlPath = url.parse(request.url).pathname;
    if( urlPath === '/' ){
      urlPath = '/index.html';
    }
    //exports.sendResponse(response, urlPath);
    headers.serveAssets(response, urlPath, function(){
    // trim leading slash if present
      if( urlPath[0] === '/' ) { urlPath = urlPath.slice(1)}
      if( archive.isUrlInList(urlPath)){ // if yes
        headers.sendRedirect(response, '/loading.html');
      } else { // if no
        headers.send404(response);
      }
    });

  } else if (request.method === 'POST'){
    collectData(request, function(message){
      if (!archive.isUrlInList(message)){
        fs.mkdirSync("./archives/sites/" + message);
        fs.appendFile('./archives/sites.txt', message + '\n', 'utf8');
      } else {
        console.log('already in list');
      };
      archive.downloadUrls();

      exports.sendResponse(response, "Hello World", 201);
    })

  } else {
    exports.sendResponse(response, "Not found", 404);

  }
};




