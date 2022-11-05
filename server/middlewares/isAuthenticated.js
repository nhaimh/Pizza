function isAuthenticated(req, res, next) {

    if (!req.user) {
        throw new Error("You are not authenticated to do that!")
        // return res.status(400).json({ message: "You are not authenticated to do that!" });
    } else {
        next();
    }

}

module.exports = isAuthenticated;