const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
    userId: Number,
    id: Number, 
    title: String,
    body: String
})

module.exports = mongoose.model('Post', post);