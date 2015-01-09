var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var handlers = require('./request-handler')

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};
  fs.readFile( archive.paths.siteAssets + asset, encoding, function(err, data){
    if(err){
      // file doesn't exist in public!
      fs.readFile( archive.paths.archivedSites + asset, encoding, function(err, data){
        if(err){
          // file doesn't exist in archive!
          callback ? callback() : exports.send404(res);
        } else {
          handlers.sendResponse(res, data);
        }
      });
    } else {
      handlers.sendResponse(res, data);
    }
  })
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

// As you progress, keep thinking about what helper functions you can put here!

exports.send404 = function(response){
  handlers.sendResponse(response, '404: Page not found', 404);
}
