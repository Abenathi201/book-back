const mongoose = require('mongoose');
const { Schema } = mongoose;

const Books = require('./Books');
const Users = require('./Users');

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    items: [
        {
            bookId: {
                type: Schema.Types.ObjectId,
                ref: 'Books',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    grandTotal: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;