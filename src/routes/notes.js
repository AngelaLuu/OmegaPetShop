//const { create } = require('express-handlebars')
const router = require('express').Router()
const Note = require("../models/Note")
const express = require('express');

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
            res.redirect("/notes/tienda")
        } else {
            req.flash("error", "Error al agregar el producto")
            res.redirect("/notes")
        }

        
    }
})

router.get("/notes/tienda", (req, res) => {
    res.render("notes/tienda")
})


router.post('/filtro', async (req, res) => {
    try {
        // Obtén el nombre de la tienda seleccionada desde el formulario
        const nombreTienda = req.body.nombreTienda;

        // Construye el filtro para la consulta
        const filtro = nombreTienda ? { nombreTienda: nombreTienda } : {};

        // Realiza la consulta a la base de datos con el filtro
        const notes = await Note.find(filtro);

        // Renderiza la vista de productos con los resultados filtrados
        res.render('notes/list', { notes });
    } catch (error) {
        console.error('Error al manejar la ruta /filtro:', error);
        // Manejar el error de acuerdo a tus necesidades
        res.status(500).send('Error interno del servidor');
    }
});


module.exports = router
