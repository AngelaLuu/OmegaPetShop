const router = require('express').Router()
const Note = require("../models/Note")


// router.get('/', (req, res, next) => {
//     res.render('notes')
// })
router.get('/', async (req, res, next) => {
    const notes = await Note.find().sort({date: 'desc'})
        res.render('notes/list', {notes})
    })

router.get('/about', (req, res, next) => {
    res.render('about')
})

router.get("/notes/tienda", async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'})
        res.render('notes/tienda', {notes})
    })



module.exports = router