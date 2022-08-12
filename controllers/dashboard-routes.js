
const router = require('express').Router();
const {User} = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');


// route to render dashboard page 

router.get('/', withAuth, (req,res) => {
 
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.session.user_id
      }
    })
    .then(userData => {
      res.render('dashboard', {loggedIn: true})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// A route to edit user credentials
router.get('/edituser', withAuth, (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.session.user_id
      }
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        const user = userData.get({ plain: true });
        res.render('edit-user', {user, loggedIn: true});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
    });

      // route to chat-room
  
    // router.get('/chat-room', (req, res)=> {
    //   res.sendFile('chat-room.html', { root: path.join(__dirname, '../public') });
    // })

    router.get('/chat-room',function(req, res){
      //res.sendFile(__dirname + '/public' + '/chat-room.html');
      // res.sendFile('public/chat-room.html' , { root : __dirname});
      res.render('chat-room', {loggedIn: true })
    });
  
  module.exports = router;