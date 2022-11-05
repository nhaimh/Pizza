const express = require('express');
const config = require('./config/config');
const router = require('./routes');
const cors = require('cors');
const app = express();

require('./config/mongoose')();
require('./config/express')(app);

app.use(router);
app.use(cors());

app.use((err, req, res, next) => {
    res.status(err.statusCode || 400).json({ error: { message: err.message } });
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', "*")
    next();
});

app.listen(config.PORT, () => console.log(`Server is loading on port ${config.PORT}...`))