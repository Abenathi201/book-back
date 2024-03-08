const express = require('express');
const mongoose = require('mongoose');

const Books = require('../models/Books.js');

const router = express.Router();

const getBooks = async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBook = async (req, res) => {
    const id = req.params;

    try {
        const book = await Books.find(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBook = async (req, res) => {
    const { title, image, author, summary, categories } = req.body;

    const newBook = new Books({ title, image, author, summary, categories });

    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, image, author, summary, categories } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).send(`There are no books with the id: ${id}`);
    }

    const updatedBook = { title, image, author, summary, categories, _id: id };

    await Books.findByIdAndUpdate(id, updatedBook, { new: true });
    
    res.json(updatedBook);
}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).send(`There are no books with the id: ${id}`);
    }

    await Books.findByIdAndDelete(id);

    res.json({ message: 'Book deleted!' });
}

module.exports = {
    router,
    getBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
};