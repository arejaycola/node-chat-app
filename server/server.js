/*io.emit -> everyone connected*/
/*socket.broadcast.emit -> everyone but me*/
/*socket.emit -> event to one user */



const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

/*For socket.io configuration*/
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected')

	socket.on('join', (params, callback) => {
		/* Validate the data */
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback('Name and room name are requried');
		}

		socket.join(params.room);

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

		callback();

	});	

	socket.on('createMessage', (message, callback) => {
		/* Emit message to all connections */
		io.emit('newMessage', generateMessage(message.from, message.text));

		/* Send an acknowledgement back. */
		callback();
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
