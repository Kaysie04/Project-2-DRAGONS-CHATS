
// CHAT ROOM SERVER CODE
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// app.get('/', (req, res)=> {
//     res.sendFile(__dirname + chat.html)
// })



    // creates socket server on port
  const PORT = process.env.PORT || 3001;
  const io = require('socket.io')(`${PORT}`)
  const users = {}
  
  
  // when user loads the page socket will send other users a message 
  io.on('connection', socket => {
      socket.on('new-user', name => {
          users[socket.id] = name
          socket.broadcast.emit('user-connected', name)
      })
  
      // chat-message is the event name
      //socket.emit('chat-message', ' you are connected to the server ')
      socket.on('send-chat-message', message => {
          
          // sends message to everyone connected to the server, except for person that sent the message
          socket.broadcast.emit('chat-message', {message : message, name: users[socket.id]})
      })
      socket.on('disconnect', () => {
          socket.broadcast.emit('user-disconnected', users[socket.id])
          delete users[socket.id]
          
      })
  })
  
//   app.use(express.static(path.join(__dirname, 'public-chat-room')))
 

// location of where socket is being hosted
const socket = io('http://localhost:3000')


const messageContainer = document.getElementById('message-div')
const messageForm = document.getElementById('send-form')
const messageInput = document.getElementById('message-text')

const name = prompt('choose a character name?')
appendMessage('You joined')
socket.emit('new-user', name)

// on the 'chat-message' event which was defined in server.js: socket.emit('chat-message', ' you are connected to the server ')
// when an event happens, we call a function with the data that was sent from the server
socket.on('chat-message', data => {
    //console.log(data)
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})


messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value 
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}