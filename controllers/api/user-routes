const router = require('express').Router();
const {User} = require('../../models');


// POST REQUESTS

// create a new user profile
router.post('/', (req, res)=> {
    User.create({ 
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(newUserData => {
        req.session.save(()=> {
            req.session.user_id = newUserData.id;
            req.session.username = newUserData.username;
            req.session.loggedIn = true;

            res.json(newUserData)
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// login to existing profile

router.post('/login', (req,res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'No profile found with given email address'})
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid Password'});
        }

        req.session.save(()=>{
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            
            res.json({ user: userData, message: 'Logged in!'})
        });
    });
});

// logout an existing user

router.post('/logout', withAuth, (req,res)=> {
    if (req.session.loggedIn) {
        req.session.destroy(()=> {
        
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

// PUT REQUESTS

// update a user's profile

router.put('/:id', withAuth, (req, res)=> {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then (userData => {
        if (!userData[0]) {
            res.status(404).json({ message: ' No user found'});
            return;
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
})

// DELETE REQUESTS

// user wants to delete profile
router.delete('/:id', withAuth, (req, res)=> {
    User.destroy({
        where: { id: req.params.id}
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found'});
            return;
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
})

module.exports = router;