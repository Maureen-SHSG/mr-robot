// Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
<<<<<<< HEAD
    feedback = document.getElementById('feedback');
=======
    feedback = document.getElementById('feedback'),
    title = document.getElementById('title')
    question = document.getElementById('question');

>>>>>>> dc9f95832c6962ca2f806695600044bbc0c8a4f2

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
    title: title.value,
    question: question.value,
    message: message.value,
    handle: handle.value
  });
  question.value = "",
  message.value = "";
});

<<<<<<< HEAD
message.addEventListener('keypress', function(e){
  if (e.keyCode === 13&& !e.shiftKey) {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
  message.value = "";
  }
});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
=======

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);

});


// Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.title + ' </strong>' +  '<br/>' + data.question + '<br/>' + '<strong>' + data.handle + ': </strong>' +  data.message + '</p>';
});

socket.on('typing',function(data){
  feedback.innerHTML='<p><em>'+ data + 'is typing a message...</em></p>';
>>>>>>> dc9f95832c6962ca2f806695600044bbc0c8a4f2
});

socket.on('typing',function(data){
  feedback.innerHTML ='<p><em>'+data+' is typing a message...</em></p>';
});
