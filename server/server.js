var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(express.static(__dirname + '/src'));

mongoose.connect('mongodb://localhost/webForum', {useNewUrlParser: true });

require('./config/routes.js')(app)

// app.all("*", (req,res,next) => {
//   res.sendFile(path.resolve("./../src/index.html"))
// });

app.listen(8000, function() {
  console.log("Listening on port 8000");
});
