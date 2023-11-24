const passport = require ('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require("../models/User")

passport.use(new LocalStrategy({
    usernameField: 'correo'
},  async (correo, contraseña, done) => {
    const user = await User.findOne({correo: correo})
    console.log(correo, contraseña, User)
    if(!user) {
        return done(null, false, {message: "Usuario no encontrado"})
        
    } else {
        const match = await user.matchPassword(contraseña)
        if(match) {
            return done(null, user)
        } else {
            return done(null, false, {message: "Contraseña incorrecta"})
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
