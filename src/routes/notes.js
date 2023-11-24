//const { create } = require('express-handlebars')
const router = require('express').Router()
const Note = require("../models/Note")

router.get('/notes', async (req, res, next) => {
    const notes = await Note.find().sort({date: 'desc'})
        res.render('notes/list', {notes})
    })

router.get("/notes/add", (req, res) => {
    res.render("notes/add")
})


router.post("/notes/add", async (req, res) => {
    const {nombreTienda, nombreProducto, precio, imagen, descripcion }=req.body
    const errors = []
    if (!nombreTienda) {
        errors.push ({ text: "Escribe el nombre de la tienda"})
    }
    if (!nombreProducto) {
        errors.push ({ text: "Escribe el nombre del producto"})

    }
    if (!precio) {
        errors.push ({ text: "Escribe el precio"})
    }
    if (!imagen) {
        errors.push ({ text: "Escribe la imagen"})

    }
    if (!descripcion) {
        errors.push ({ text: "Escribe la descripcion"})

    }

    if (errors.length > 0) {
        res.render("notes/add",{
            errors,
            nombreTienda,
            nombreProducto,
            precio,
            imagen,
            descripcion
        })
    } else {
        const newNote = new Note({
            nombreTienda,
            nombreProducto,
            precio,
            imagen,
            descripcion
        })
        const newN = await newNote.save()
        if (newN) {
            req.flash("suc", "Producto agregado satisfactoriamente")
            res.redirect("/notes")
        } else {
            req.flash("error", "Error al agregar el producto")
            res.redirect("/notes")
        }

        
    }
})


module.exports = router