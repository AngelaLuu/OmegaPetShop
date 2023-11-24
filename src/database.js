const mongoose = require('mongoose')

const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/Tienda_Mascotas';
mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    //useCreateIndex: true,
    useNewUrlParser: true,
    //useFindAndModify: false
})

    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err))