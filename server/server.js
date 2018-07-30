const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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


	socket.on('createMessage', (message) => {
		/* Emit message to all connections */
		io.emit('newMessage', generateMessage(message.from, message.text));
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});




server.listen(port, () => {
	console.log('Started on port ' + port);
});
