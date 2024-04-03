const router = require('express').Router()
const User = require('../models/User')


// Route to render the home page
router.get('/', async (req, res) => {

    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']}
        })
        if (!req.session.logged_in) {
            res.render('home')
        }
        if (req.session.logged_in) {
            const user = userData.get({plain: true})
            res.render('home',{...user, logged_in: req.session.logged_in} )
        }

        
    } catch (err) {
        res.status(500).json
    }
})

// Route to get the users----TEST ROUTE ONLY DELETE BEFORE DEPLOY----------
// router.get('/users', async (req, res) => {
//     try {
//         const userData =  await User.findAll()
      
//         res.status(200).json(userData)
        
//     } catch (err) {
//         res.status(500).json
//     }
// })


// Route to render the login page
router.get('/login', async (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect('/')
            return
        }
        res.render('login')
    } catch (err) {
        res.status(500).json(err)
    }
})


// Route to render the signup page
router.get('/signup', async (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect('/')
            return
        }
        res.render('signup')
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router