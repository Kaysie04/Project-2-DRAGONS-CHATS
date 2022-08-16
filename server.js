const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');


const app = express();
server = require('http').createServer(app);
const PORT1 = process.env.PORT || 3000;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT1, () => console.log(`Now Listening on ${PORT1}`));
});



// chat room 
  const io = require('socket.io').listen(server)
  const users = {}
  

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












