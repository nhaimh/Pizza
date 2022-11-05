const Feedback = require('../models/Feedback');

const getAllComments = async () => {
    let comments = await Feedback.find();

    if (comments) {

        comments = comments.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    return comments
}

const createComment = (data) => {

    let comment = new Feedback({ ...data })
    return comment.save();
}

const getOneComment = (id) => {
    let comment = Feedback.findById(id).lean();
    return comment;
}

function deleteOneComment(id) {
    return Feedback.deleteOne({ _id: id })
}

function editOneComment(commentid, data) {
    return Feedback.updateOne({ _id: commentid }, data)
}

module.exports = {
    getAllComments,
    createComment,
    getOneComment,
    deleteOneComment,
    editOneComment
}