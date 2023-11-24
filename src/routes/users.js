const router = require('express').Router()
const {middleware_passport: passport, logginIn} = require ('../config/passport')
const User = require("../models/User")
const bcrypt = require ('bcryptjs')



router.get('/users/singup', (req, res, next) => {
    res.render('users/singup')
})

router.post('/users/singup',async (req, res, next) => {

    const { nombreTien, nombrePersona, direccion, numero, correo, password, type} = req.body
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
    if (password.lenght <= 0) {
        errors.push({ text: "Ingresa tu password"})
    }
    if(password.lenght<4) {
        errors.push({text: "La password debe tener más de 4 caracteres"})
    }
    if(errors.lenght>0) {
        res.render('users/singup', {errors, nombrePersona, direccion, numero, correo, password, type}) 
    } else {
        const userCorreo = await User.findOne({correo: correo})
        if (userCorreo) {
            req.flash("error", "El correo ya esta en uso")
            res.redirect("/users/singup")

        }
        const newUser = new User({ nombreTien, nombrePersona, direccion, numero, correo, password, type})
         newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash("suc", "Usuario registrado satisfactoriamente")
        res.redirect("/users/sigin")
    }

})


router.get('/users/sigin', (req, res, next) => {
    console.log('comotas')
    res.render('users/sigin')
})

router.post('/users/sigin', logginIn )
    

module.exports = router
