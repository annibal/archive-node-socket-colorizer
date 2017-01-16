
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

 
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

