var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);
    $('tr').each(function() {
      var $permission = $(this).find(':first-child').find(':first-child');
      var $file = $(this).find(':nth-child(3)').find(':first-child');

      var permission = $permission.text().substring(1).slice(0, -1);
      var url = $file.attr('href');
      var type = path.extname($file.text()).substring(1);

      var str = permission + ', ' + url + ', ' + type + '\n';

      fs.appendFile('image.csv', str, function(err) {
        if (err) throw err;
      });
    });
  }
});
