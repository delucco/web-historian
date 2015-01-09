var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var html = require('/Users/student/2014-12-web-historian/workers/htmlfetcher.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  var fileContents = fs.readFileSync('/Users/student/2014-12-web-historian/web/archives/sites.txt', 'utf8');
  return fileContents.split('\n');
};

exports.isUrlInList = function(url){
  var list = exports.readListOfUrls();
  for( var i = 0; i < list.length; i++ ){
    if(url === list[i]){
      return true;
    }
  }
  return false;
};

exports.addUrlToList = function(message){
  fs.appendFile('/Users/student/2014-12-web-historian/archives/sites.txt', '\n' + message, 'utf8');
};

exports.isURLArchived = function(){
    //loop through url array
    //return true if in there else false
};

exports.downloadUrls = function(){
  //use chron- for each url, scrape the url
  var list = exports.readListOfUrls();
  for( var i = 0; i < list.length; i++ ){
    html.fetcher(list[i]);
  }
};













