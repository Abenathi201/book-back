const express = require('express');
const mongoose = require('mongoose');

const Cart = require('../models/Cart.js');
const Books = require('../models/Books.js');

const router = express.Router();

// Get cart items for a specific user
const getCartItems = async (req, res, next) => {
    try {
        const userId = req.params._id;

        console.log('Request user:', req.user);
        const cart = await Cart.findOne({ userId }).populate('items.bookId');

        if (!cart) {
            return res.status(200).json([]);
        }

        res.status(200).json(cart.cartItems);
    } catch (error) {
        next(error);
    }
};

const addCartItems = async (req, res, next) => {
    try {
        const { bookId, quantity } = req.body;
        const book = await Books.findOne({ _id: bookId });

        if (!book) {
            throw new Error('Book not found');
        }

        // Get a user's cart
        let cart = await Cart.findOne({ userId: req.user._id });

        // If the user does not have a cart create a new one
        if (!cart) {
            cart = new Cart({ userId: req.user._id, items: [] });
        }

        // Check if the book is already in the cart
        let bookItem = cart.items.find(item => item.bookId.toString() === bookId);

        // Check if the book exists
        if (!bookItem) { // Fix: Check if bookItem is undefined
            // If the book is not in the cart, add it
            cart.items.push({ bookId, name: book.title, amount: book.amount, quantity, total: book.amount * quantity });
        } else {
            // If it does exist, update the quantity and the total
            bookItem.quantity += quantity;
            bookItem.total = book.amount * bookItem.quantity;
        }

        // Calculate the grand total
        let grandTotal = 0;
        for (let item of cart.items) {
            grandTotal += item.total;
        }
        cart.grandTotal = grandTotal;

        // Save the cart
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    router,
    getCartItems,
    addCartItems
}