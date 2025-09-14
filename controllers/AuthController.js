const User = require('../models/User')

module.exports = class AuthController {

    static register(req, res) {
        res.render('auth/register')
    }
    static async login(req, res) {
        res.render('auth/login')
    }

}