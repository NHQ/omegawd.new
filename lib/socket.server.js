var io = require('socket.io').listen(8020);

io.sockets.on('connection', function (socket) {

  socket.on('touch', function (data) {
    console.log(data);
  });

});