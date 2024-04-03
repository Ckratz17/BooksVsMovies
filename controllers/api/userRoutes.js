const router = require('express').Router()
const User = require('../../models/User')

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

//Route to login to an already created user using the email and password of the user
router.post('/login', async (req, res) => {
    try {
        // Find the user based off of the email given
        const userData = await User.findOne({ where: { email: req.body.email } })

        if (!userData) {
            res.status(404).json({ message: `Incorrect email or password, please try again!` })
            return
        }

        // Checks the password given to compare to the user's password for the email given using the checkPassword method that's attached to the user model
        const validPassword = await userData.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(404).json({ message: `Incorrect email or password, please try again!` })
            return
        }

        // Session is saved while the user is  logged in
        req.session.save(() => {
            req.session.name = userData.name
            req.session.user_id = userData.id
            req.session.logged_in = true

            res.status(200).json({ message: `Logged in successfully!` })
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Route to logout 
router.post('/logout', async (req, res) => {
    try {
        // Destroy the session if the user is logged in
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).json({ message: `You are now logged out!` })
            })
        } else {
            res.status(404).json('You are not logged in!')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router