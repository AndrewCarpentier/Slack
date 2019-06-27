let http = require('http');
let server = http.createServer(function (req, res) {

});
let io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log(msg)
        socket.broadcast.emit('message', { content: msg.msg, user: msg.username });
    });

});

server.listen(666, function () {
    console.log('start web socket server');
});