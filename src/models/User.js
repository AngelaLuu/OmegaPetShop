const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require ('bcryptjs')

const userSchema = new Schema({
    nombreTien : {
        type: String
    },
    nombrePersona : {
        type: String, required: true
    },
    direccion : {
        type: String, required: true
    },
    correo : {
        type: String, required: true
    },
    numero : {
        type: Number, required: true
    },
    contraseña : {
        type: String, required: true
    },
    type : {
        type: String, required: true
    },
})

userSchema.methods.encryptPassword= async(contraseña) => {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(contraseña, salt)
    return hash
}

userSchema.methods.matchPassword = async function (contraseña) {
    return  await bcrypt.compare(contraseña, this.contraseña)
}

module.exports = mongoose.model('User', userSchema)