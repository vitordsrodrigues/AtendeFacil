const User = require('../models/User')

module.exports = class AuthController {

    static async login(req, res) {
        res.render('auth/login')
    }

    static register(req, res) {
        res.render('auth/register')
    }
    
    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        //validações
        if(password != confirmpassword) {
            res.flash('message', 'As senhas não conferem, tente novamente.')
            res.render('auth/register')
            return
        }

        //verifica se o usuário já existe
        const checkIfUserExists = await User.findOne({ where: { email: email } })
        if(checkIfUserExists) {
            res.flash('message', 'O e-mail já está em uso.')
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

            res.flash('message', 'Cadastro realizado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.error(error)
            res.flash('message', 'Erro ao cadastrar usuário.')
            res.render('auth/register')
        }
    }

}