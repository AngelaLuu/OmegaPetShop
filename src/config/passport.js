const passport = require ('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require("../models/User")

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log(username, password, User)
    const user = await User.findOne({correo: username})
    console.log(user)
    if(!user) {
        return done(null, false, {message: "Usuario no encontrado"})
        
    } else {
        return done(null, user)
        const match = await user.matchPassword(password)
        if(match) {
            
        } else {
            return done(null, false, {message: "password incorrecta"})
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(id,'soyID')
    User.findById(id 
    ) .then(response=>{
        done(null, response)
    }) 
})

const logginIn = (req, res, next ) => {
    req.body = {
        username: 'angela@gmail.com',
        password: '1234567'
    }
    console.log('loggingIn', req.body);
    passport.authenticate('local', {
    successRedirect: '/notes/tienda',
    failureRedirect: '/users/singup',
    failureFlash: true
}) (req, res, next)
}

module.exports = {
    middleware_passport : passport,
    logginIn
};