var express = require('express');

// App setup
var app = express();
<<<<<<< HEAD
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
=======
var server = app.listen(4000,function(){
  console.log('listening to requests on port 4000');
});

//Static files
>>>>>>> 0df570d9c5cd24b0d4253bad8fc925bae091e6e4
app.use(express.static('public'));
