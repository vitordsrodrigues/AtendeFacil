const express = require('express')
const router = express.Router()
const PerfilController = require('../controllers/PerfilController')

//Middleware para proteger as rotas
const checkAuth = require('../helpers/auth').checkAuth



module.exports = router

