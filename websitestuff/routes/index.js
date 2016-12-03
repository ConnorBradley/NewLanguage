var express = require('express');
var router = express.Router();
var fs = require('fs');
var wd = require("word-definition");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  wd.getDef("keyboard", "en", null, function(definition) {
    console.log(definition);
  });
  res.render('index');
})

router.get('/search', function(req, res, next) {
  var query = req.query.word
  var item = {
    originalword : req.query.word,
    newword : 'Doesnt exist',
    definition : ''
  }
  var linenum;

  fs.readFile('dictionary.csv', function (err, data) {
      if (err) throw err;
      if(data.indexOf(query) < 0){
       console.log(data)
      }
      else {
        linenum = data.indexOf(query);
      }

    get_line('dictionary.csv', linenum, function(err, line){
      console.log('The line: ' + line);
      if (line){
        var afterComma = line.substr(line.indexOf("=") + 1);
        item.newword = afterComma
      }
      wd.getDef(query, "en", null, function(definition) {
        console.log(definition);
        item.definition = definition.definition
        res.render('index', {items : item});
      });


    })
    });
  });

function get_line(filename, line_no, callback) {
  var stream = fs.createReadStream(filename, {
    flags: 'r',
    encoding: 'utf-8',
    fd: null,
    mode: 0666,
    bufferSize: 64 * 1024
  });

  var fileData = '';
  stream.on('data', function(data){
    fileData += data;

    // The next lines should be improved
    var lines = fileData.split("\n");

    if(lines.length >= +line_no){
      stream.destroy();
      callback(null, lines[+line_no]);
    }
  });

  stream.on('error', function(){
    callback('Error', null);
  });

  stream.on('end', function(){
    callback('File end reached without finding line', null);
  });

  }

module.exports = router;
