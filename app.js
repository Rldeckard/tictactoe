var http = require("http");
let fs = require('fs');

var server = http.createServer(function (request, response) {
   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/html'});

   // Send the response body as "Hello World"
   fs.readFile('./src/index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.end('Whoops! File not found!');
        } else {
            response.end(data);
        }
    });
});
server.listen(3000);
// Console will print the message
console.log('Server running at http://127.0.0.1:3000/');

const io = require('socket.io')(server);

//listen on every connection
io.on('connection', (socket) => {
	io.sockets.emit('new_message', {message : 'New user connected', username: 'System'})
	//default username
	socket.username = "Guest"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
				io.sockets.emit('new_message', {message : 'Guest changed name to "' + data.username + '"', username : 'System'});
    })

    //listen on new_message
    socket.on('moveMade', (data) => {
      io.sockets.emit('moveMade', {pos : data.pos, userClick : data.userClick, count : data.count});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
