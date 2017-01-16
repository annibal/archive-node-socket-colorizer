
// colorizer server
var http = require("http");
var path = require("path");
var socketio = require("socket.io");
var express = require("express");

// index.html and nolor.js providing
var app = express();
app.use(express.static(path.resolve(__dirname, 'public')));

var server = http.createServer(app);
var io = socketio.listen(server);

var sockets = [];
var colors = [];

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

io.on("connection",function(socket) {
    
    sockets.push(socket);
    
    colors.forEach(function(color) {
        socket.emit("srv_color",color);
    })

    socket.on('disconnect', function () {
        sockets.splice(sockets.indexOf(socket), 1);
    });
    
    socket.on("cli_color",function(color) {
        colors.push(color);
        broadcast("srv_color",color)
    });
    
    socket.on("cli_reset",function() {
      colors = [];
    });
})



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

