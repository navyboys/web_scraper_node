var request = require('request');
var cheerio = require('cheerio');

request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);
    $('tr').each(function() {
      console.log($(this).find(':first-child').find(':first-child').html());
      console.log($(this).find(':nth-child(2)').find(':first-child').html());
      console.log($(this).find(':nth-child(3)').find(':first-child').html());
    });
  }
});
