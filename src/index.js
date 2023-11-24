const express =require  ('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require ('express-session')
const flash = require ('connect-flash')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const passport = require('passport')

//Initializations
const app = express()
require('./database')
require('./config/passport')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    handlebars : allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave : true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//routees
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))



//global variables
app.use((req, res, next) => {

    app.locals.suc = req.flash("suc")
    app.locals.error = req.flash("error")

    next()
})

//static files
app.use(express.static(path.join(__dirname, 'public')))



//server listening
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})