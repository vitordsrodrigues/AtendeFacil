const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static async login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        //verifica se o usuário existe
        const user = await User.findOne({ where: { email: email } })
        if(!user) {
            req.flash('message', 'Usuário não encontrado.')
            res.render('auth/login')
            return
        }

        //verifica se a senha confere
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            res.flash('message', 'Senha incorreta.')
            res.render('auth/login')
            return
        }

        // Inicializa a sessão
        req.session.userid = user.id

        req.flash('message', 'Login realizado com sucesso!')
        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }
    
    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        //validações
        if(password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente.')
            res.render('auth/register')
            return
        }

        //verifica se o usuário já existe
        const checkIfUserExists = await User.findOne({ where: { email: email } })
        if(checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso.')
            res.render('auth/register')
            return
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        // Cria o usuário
        const user = { name, email, password: hashedPassword }
        try {
            const createdUser = await User.create(user)

            // Inicializa a sessão
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.error(error)
            req.flash('message', 'Erro ao cadastrar usuário.')
            res.render('auth/register')
        }
    }

    static async logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/login')
        })
    }

}