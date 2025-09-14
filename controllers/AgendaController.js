const User = require('../models/User')

module.exports = class AgendaController {

    static showAgenda(req, res) {
        res.render('pages/Home')
    }
}