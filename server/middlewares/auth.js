const jwt = require('jsonwebtoken');
const { COOKIE_NAME, SECRET } = require('../config/config');

module.exports = function () {
    return (req, res, next) => {

        let token = req.headers['authorization']?.split(' ')[1] || undefined;

        if (token == 'undefined') {
            token = false;
        }

        if (token) {
            jwt.verify(token, SECRET, function (err, decoded) {

                if (err) {
                    throw new Error('Your token is not valid')

                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;

                }
            })
        }
        next();
    }
}