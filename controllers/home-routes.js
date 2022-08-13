
const router = require('express').Router();


// load home page

router.get('/', (req,res) => {
  res.render('homepage', {
  });
})


// load login page

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// load signup page

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});





module.exports = router;