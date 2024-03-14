const mongoose = require('mongoose');
const { Schema } = mongoose
const Books = require('./Books');

const itemSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Books',
        required: true
    },
    name: String,
    amount: Number,
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    total: {
        type: Number,
        required: true,
        default: 0
    }
})

const Items = mongoose.model('Items', itemSchema);

module.exports = Items;