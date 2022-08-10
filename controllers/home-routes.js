const router = require('express').Router();
const sequelize = require('../config/connection');
const {User} = require('../models');


// load login page

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// load signup page

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// home page

router.get('/', (req,res) => {
  res.render('homepage');
})



module.exports = router;