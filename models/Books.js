const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: String,
    image: String,
    author: String,
    amount: Number,
    summary: String,
    categories: String
})

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;