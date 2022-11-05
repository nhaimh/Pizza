const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const cors = require("cors");

function setUpExpress (app){
    
    // app.use(express.static('public'))
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(auth());

}

module.exports = setUpExpress;