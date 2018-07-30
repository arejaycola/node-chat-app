const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

/*For socket.io configuration*/
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');


	socket.on('createMessage', (message) => {
		/* Emit message to all connections */
		io.emit('newMessage', {
			from: message.from,
			text: message.text, 
			createdAt: new Date().getTime()
		})
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});




server.listen(port, () => {
	console.log('Started on port ' + port);
});
