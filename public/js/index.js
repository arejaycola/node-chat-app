var socket = io();

socket.on('connect', function() {
	console.log('Connect to server');

});

socket.on('disconnect', function() {
	console.log('Disconnected from the server');
});

socket.on('newMessage' , function(message){
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	$('#messages').append(li);

	console.log('newMessage', message);
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User', 
		text: $('[name=message]').val()
	}, function(){

	})
});