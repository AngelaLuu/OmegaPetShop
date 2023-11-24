const mongoose = require("mongoose")
const {Schema} = mongoose

const NoteSchema = new mongoose.Schema({
    nombreTienda: {
        type:String, required:true
    },
    nombreProducto: {
        type:String, required:true
    },
    precio: {
        type:Number, required:true
    },
    imagen: {
        type:String, required:true
    },
    descripcion: {
        type: String, required: true
    },
    //date: {type:date, default: Date.now}
})

module.exports = mongoose.model('Note', NoteSchema)