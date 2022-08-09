// dependencies
const express = require('express');
const sequelize = require("./config/connection");
const routes = require('./controllers/');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);



const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });
