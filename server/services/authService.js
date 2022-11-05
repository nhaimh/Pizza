const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, SECRET } = require('../config/config')
const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (username, password) => {

     let allUsers = await User.find();
     let duplicate = allUsers.find(users => users.username == username)

     if (duplicate) throw { message: 'The name is taken' };

     let salt = await bcrypt.genSalt(SALT_ROUNDS);
     let hash = await bcrypt.hash(password, salt);

     let user = new User({ username, password: hash, roles: 'client' });
     return user.save();
}

const login = async (username, password) => {

     let user = await User.findOne({ username: username });

     if (!user) throw new Error('User not found');

     let isMatch = await bcrypt.compare(password, user.password);

     if (!isMatch) throw new Error('Password does not match');

     let token = jwt.sign({ _id: user._id, username: user.username, roles: user.roles }, SECRET, { expiresIn: '1d' });

     return { token, user };
}

module.exports = {
     login,
     register
}