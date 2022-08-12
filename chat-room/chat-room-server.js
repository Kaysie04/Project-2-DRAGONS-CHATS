const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server)
const PORT2 = process.env.PORT || 8001;


// get request here
app.get('/', (req, res)=> {
    res.sendFile('chat-room.html', {root:path.join(__dirname, '/public')})
})

// io stuff

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
}) 

server.listen(`${PORT2}`, () => {
    console.log(`listening on port ${PORT}`)
})