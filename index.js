var express = require('express');
var socket = require('socket.io');
const port = process.env.PORT || 4000
// App setup
var app = express();
var server = app.listen(port,function(){
    console.log('listening for requests on port 4000');
});

//Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', function(socket){

    console.log('made socket connection', socket.id);

//Handle chat evet
    socket.on('chat',function(data){
      io.sockets.emit('chat', data);
    });

//Handle typing event
    socket.on('typing', function(data){
      socket.broadcast.emit('typing', data);
    });

});
