const express = require('express');
const router = express.Router();

const { getBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/books.js')

// Get all the books
router.get('/', getBooks);

// Get one book
router.get('/:id', getBook);

// Create a new book
router.post('/', createBook);

// Update or patch a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router;