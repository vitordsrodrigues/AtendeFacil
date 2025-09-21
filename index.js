const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const passport = require('passport')

const app = express()

const conn = require('./db/conn')
const env = require('./config/env')

const config = require('./config/passport')

//Importando Models
const User = require('./models/User')


//Importando Rotas
const AgendaRoutes = require('./routes/AgendaRoutes')
const AuthRoutes = require('./routes/AuthRoutes')

//Importando Controllers
const AgendaController = require('./controllers/AgendaController')
const AuthController = require('./controllers/AuthController')

//Configuração do Handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.use(
    session({
        name: 'session',
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true,
        },
    })
)

app.use(flash())
app.use(express.static('public'))

// Inicializar Passport antes das rotas
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

app.use('/',AgendaRoutes)
app.use('/',AuthRoutes)
app.get('/', AgendaController.showAgenda)

conn
//.sync({force:true})
.sync()
.then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err))
