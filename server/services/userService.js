const User = require('../models/User');

const getAllUsers = () => {
  return User.find();
}

const getOneUser = (id) => {
    return User.findById(id).lean();
}

const editUser = (id, data) => {
   return User.updateOne({_id: id}, data);
}

const deleteUser = (id) => {
   return User.deleteOne({_id: id})
}


module.exports = {
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser
}