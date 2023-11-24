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
    password : {
        type: String, required: true
    },
    type : {
        type: String, required: true
    },
})

// userSchema.methods.ObtenerTokenJWT= function(){
//     const JWT_SECRET_KEY = "Lulu"
//     return jwt.sign({
//         id: this._id,
//         nombreTien: this.nombreTien,
//         nombrePersona: this.nombrePersona,
//         direccion: this.direccion,
//         correo: this.correo,
//         numero: this.numero,
//         type: this.type,
//         password: this.password,
//     }, 
//         JWT_SECRET_KEY, 
//         { 
//             expiresIn: Date.now() + 10000
//         }
//     )
// }

 userSchema.methods.encryptPassword= async(password) => {
     const salt = await bcrypt.genSalt(10)
     const hash = bcrypt.hash(password, salt)
     return hash
 }

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
    
}

const User =
module.exports = mongoose.model('User', userSchema)
