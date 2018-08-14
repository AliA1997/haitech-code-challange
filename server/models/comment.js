const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    postId: Number,
    id: Number, 
    name: String, 
    email: String,
    body: String, 
})

module.exports = mongoose.model('Comment', comment);