// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var http = require('http-request');

exports.fetcher = function(address){
  var date = new Date();
    http.get({
      url: 'http://' + address,
      progress: function (current, total) {
        console.log('downloaded %d bytes from %d', current, total);
      }
    },

    '/Users/student/2014-12-web-historian/web/archives/sites/' + address +  '/' + date + '.txt',

    function (err, res) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res.code, res.headers, res.file);
    });
}

// /Users/student/.nvm/v0.10.26/bin/node: /Users/student/.nvm/v0.10.26/bin/node: cannot execute binary file
