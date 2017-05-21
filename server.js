var express = require('express');
var app = express();
var path = process.cwd();

app.get('/', function (req, res) {
  res.sendFile(path + '/index.html');
})

app.get('/:date', function (req, res) {
    
    var input = req.params.date;
    var json;
    if (isNaN(input)) { // not a number
        var date = new Date(input);
        if (date.toDateString() != "Invalid Date") {
            json = {unix: date.getTime() / 1000, natural: input};
        }
        else {
            json = {unix: null, natural: null};   
        }
    }
    else { // number
        var time = parseInt(input);
        // convert seconds to milliseconds
        time = time * 1000;
        // try to get date
        var nat = new Date(time);
        nat = nat.toDateString();
        // check if date is valid
        if (nat == "Invalid Date") {
            json = {unix: null, natural: null};
        }
        else {
            json = {unix: input, natural: nat};   
        }
    }
    res.json(json);
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})