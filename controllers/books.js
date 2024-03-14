const express = require('express');
const mongoose = require('mongoose');

const Books = require('../models/Books.js');

const router = express.Router();

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single book
const getBook = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`Invalid ObjectId: ${id}`);
    }

    try {
        const book = await Books.findOne({ _id: id });

        if (!book) {
            return res.status(404).send(`No book found with id: ${id}`);
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new book
const createBook = async (req, res) => {
    const { title, image, author, amount, summary, categories } = req.body;

    if (!title || !image || !author || !amount || !summary || !categories) {
        return res.status(400).send('Missing required fields');
    }

    const newBook = new Books({ title, image, author, amount, summary, categories });

    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a book
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, image, author, amount, summary, categories } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`Invalid ObjectId: ${id}`);
    }

    const updatedBook = { title, image, author, amount, summary, categories, _id: id };

    try {
        const existingBook = await Books.findOne({ _id: id });

        if (!existingBook) {
            return res.status(404).send(`No book found with id: ${id}`);
        }
        await Books.findByIdAndUpdate(id, updatedBook, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`Invalid ObjectId: ${id}`);
    }

    try {
        const existingBook = await Books.findOne({ _id: id });

        if (!existingBook) {
            return res.status(404).send(`No book found with id: ${id}`);
        }

        await Books.findByIdAndDelete(id);
        res.json({ message: 'Book deleted!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    router,
    getBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
};