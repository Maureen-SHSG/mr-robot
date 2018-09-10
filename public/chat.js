// Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    title = document.getElementById('title')
    question = document.getElementById('question');


var clicks = 0;

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
  output.innerHTML += '<p><strong>' + data.title + ' </strong>' +  '<br/>' + data.question + '<br/>' + '<strong>' + data.handle + ': </strong>' +  data.message + '</p>' + '<a href="#" class="btn button-submit like-counter"><i class="far fa-heart"></i></a><span class="click-text"><a id="clicks"></span>';
  document.getElementById("clicks").innerHTML = clicks;
  $('.like-counter').click(function() {
    clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
  $('.like-counter').addClass("liked");
  });
});

socket.on('typing',function(data){
  feedback.innerHTML ='<p><em>'+data+' is typing a message...</em></p>';
});
