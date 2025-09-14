const express = require('express')
const router = express.Router()
const AgendaController = require('../controllers/AgendaController')

router.get('/', AgendaController.showAgenda)

module.exports = router