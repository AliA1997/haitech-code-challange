const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    id: Number,
    name: String, 
    username: String,
    address: {street: String, suite: String, city: String, zipcode: String, geo: {lat: String, lng: String}},
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        be: String
    } 
})

module.exports = mongoose.model('User', user);