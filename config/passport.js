const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
const env = require('./env')

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Procura usuário pelo googleId
        let user = await User.findOne({ where: { googleId: profile.id } })

        if (!user) {
            // Se não existir, cria um novo usuário
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                password: null // senha nula, pois vai logar pelo Google
            })
        }

        return done(null, user)
    } catch (err) {
        return done(err, null)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id) // guarda apenas o ID na sessão
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})
module.exports = passport