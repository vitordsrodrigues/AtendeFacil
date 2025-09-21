const express = require('express')
const router = express.Router()
const PagesController = require('../controllers/PagesController')


router.get('/', PagesController.showAgenda)
router.get('/dashboard', PagesController.showDashboard)

module.exports = router