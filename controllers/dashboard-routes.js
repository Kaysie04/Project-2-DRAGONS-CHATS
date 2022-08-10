
const router = require('express').Router();
const sequelize = require('../config/connection');
const {User} = require('../models');
const withAuth = require('../utils/auth')

// route to render dashboard page 

router.get('/', withAuth, (req,res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  });
});

// A route to edit the logged in user
router.get('/edituser', withAuth, (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.session.user.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        const user = dbUserData.get({ plain: true });
        res.render('edit-user', {user, loggedIn: true});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
    });
  
  module.exports = router;