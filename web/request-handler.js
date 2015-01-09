var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!


var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers.headers);
  response.end(archive.paths.list);
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
    sendResponse(response, null);

  } else if (request.method === 'POST'){
    collectData(request, function(message){
      if (!archive.isUrlInList(message)){
        fs.mkdirSync("./archives/sites/" + message);
        fs.appendFile('./archives/sites.txt', message + '\n', 'utf8');
      } else {
        console.log('already in list');
      };
      archive.downloadUrls();

      sendResponse(response, "Hello World", 201);
    })

  } else {
    sendResponse(response, "Not found", 404);

  }
};


  // } else if (request.method === 'GET'){
  //   sendResponse(response, {'results': 'messages'});

  // , function (err){
  //       if(err) {
  //         return console.log(err);
  //       }
  //     }

