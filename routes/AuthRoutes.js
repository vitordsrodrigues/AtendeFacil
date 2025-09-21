const express = require('express')
const router = express.Router()
const passport = require('passport')
const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// Callback do Google
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    AuthController.googleCallback
)
router.post('/login', AuthController.loginPost)
router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)
router.get('/logout', AuthController.logout)


module.exports = router
