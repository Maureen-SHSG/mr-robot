// Make connection
var socket = io.connect('https://mr-robot-shsg.herokuapp.com/');

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    title = document.getElementById('title')
    question = document.getElementById('question');


var clicks = 0;

function updateScroll(){
  element = document.getElementById('chat-window');
  element.scrollTop = element.scrollHeight;
}

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
    title: title.value,
    question: question.value,
    message: message.value,
    handle: handle.value
  });
  title.value = "";
  question.value = "";
  message.value = "";
});

message.addEventListener('keypress', function(e){
  if (e.keyCode === 13&& !e.shiftKey) {
    socket.emit('chat', {
        title: title.value,
        question: question.value,
        message: message.value,
        handle: handle.value
    });
  title.value = "";
  question.value = "";
  message.value = "";
  }
});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = "";
if(data.question == "" || data.question == undefined){
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' +  data.message + '<p>'
} else {
  output.innerHTML += '<p><strong>' + data.title + ' </strong>' +  '<br/>' + data.question + '<br/>' + '<strong>' + data.handle + ': </strong>' +  data.message + '</p>' + '<a href="#" class="btn button-submit like-counter"><i class="far fa-heart"></i></a><span class="click-text"><a id="clicks"></span>';
  document.getElementById("clicks").innerHTML = clicks;
  $('.like-counter').click(function() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    $('.like-counter').addClass("liked");
  });
}
  updateScroll();
});

socket.on('typing',function(data){
  feedback.innerHTML ='<p><em>'+data+' is typing a message...</em></p>';
});
