const router = require('express').Router()
const passport = require('passport')
const User = require("../models/User")


router.get('/users/singup', (req, res, next) => {
    res.render('users/singup')
})

router.post('/users/singup',async (req, res, next) => {

    const { nombreTien, nombrePersona, direccion, numero, correo, contraseña, type} = req.body
    const errors = []
    if (nombrePersona.lenght <= 0) {
        errors.push({ text: "Ingresa tu nombre"})
    }
    if (direccion.lenght <= 0) {
        errors.push({ text: "Ingresa tu direccion"})
    }
    if (numero.lenght <= 0) {
        errors.push({ text: "Ingresa tu numero"})
    }
    if (correo.lenght <= 0) {
        errors.push({ text: "Ingresa tu correo"})
    }
    if (type.lenght <= 0) {
        errors.push({ text: "Ingresa el tipo"})
    }
    if (contraseña.lenght <= 0) {
        errors.push({ text: "Ingresa tu contraseña"})
    }
    if(contraseña.lenght<4) {
        errors.push({text: "La contraseña debe tener más de 4 caracteres"})
    }
    if(errors.lenght>0) {
        res.render('users/singup', {errors, nombrePersona, direccion, numero, correo, contraseña, type}) 
    } else {
        const userCorreo = await User.findOne({correo: correo})
        if (userCorreo) {
            req.flash("error", "El correo ya esta en uso")
            res.redirect("/users/singup")

        }
        const newUser = new User({ nombreTien, nombrePersona, direccion, numero, correo, contraseña, type})
         newUser.contraseña = await newUser.encryptPassword(contraseña)
        await newUser.save()
        req.flash("suc", "Usuario registrado satisfactoriamente")
        res.redirect("/users/sigin")
    }

})

router.get('/users/sigin', (req, res, next) => {
    res.render('users/sigin')
})

router.post('/users/sigin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/sigin',
    failureFlash: true
}))


module.exports = passport
module.exports = router
