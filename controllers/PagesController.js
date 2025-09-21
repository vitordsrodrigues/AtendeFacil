const User = require('../models/User')

module.exports = class PagesController {

    static showAgenda(req, res) {
        res.render('pages/Home')
    }
    static showDashboard(req, res) {
        res.render('pages/Dashboard')
    }
}