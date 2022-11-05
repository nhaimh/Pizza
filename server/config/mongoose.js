const mongoose = require('mongoose');
const config = require('./config');
// require('dotenv').config();
// process.env.MONGO_URI

module.exports = () =>{
    mongoose.connect(config.DB_CONNECTION, {useNewUrlParser : true, useUnifiedTopology: true });
    let db = mongoose.connection;

    db.on('error', () => res.status(500).send('Server Error!'))
    db.once('open', () => console.log('DB CONNECTED!'))
}