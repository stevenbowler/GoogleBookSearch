//@ts-check
/**@module */
const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const routes = require("./routes");
// const app = express();                 // todo: remove if socket.io code below works
const PORT = process.env.PORT || 3001;


// sample code for socket.io
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const io = socketIO(server); // where does socketIO come from ?
// io.on('connection', () => { console.log("socket.io loggging started") });
// server.listen(3001);


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist", { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log('connected to Mongo DB') });

// Start the API server
server.listen(PORT, function () {       // todo: uncomment if socket.io doesn't work
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

var connections = [];

io.on('connection', socket => {

  connections.push(socket);
  io.sockets.emit(`user arrived`, { msg: `${connections.length}` })
  console.log("Connected: %s sockets connected", connections.length);

  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(data));
    io.sockets.emit("user left", { msg: `${connections.length}` });
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  socket.on('send message', data => {
    io.sockets.emit("new message", { msg: data });
  }); // listen to the event


  // socket.emit('request', "test socket"); // emit an event to the socket
  // io.emit('broadcast', "test all sockets"); // emit an event to all connected sockets
  // socket.on('reply', () => { /* … */ }); // listen to the event
});

// io.emit('broadcast', "Socket.io test"); // emit an event to all connected sockets