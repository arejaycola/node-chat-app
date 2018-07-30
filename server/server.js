const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

/*For socket.io configuration*/
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));


	socket.on('createMessage', (message, callback) => {
		/* Emit message to all connections */
		io.emit('newMessage', generateMessage(message.from, message.text));

		/* Send an acknowledgement back. */
		callback('This is from the server');
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
	});	

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});




server.listen(port, () => {
	console.log('Started on port ' + port);
});
