const express = require('express');
const router = express.Router();

const { getUsers, getUser, register, login, updateUser, deleteUser } = require('../controllers/users.js');

// Get all users
router.get('/', getUsers);

// Get a user
router.get('/:userId', getUser);

// Register a user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Update a user
router.put('/update/:userId', updateUser);

// Delete a user
router.delete('/delete/:userId', deleteUser);

module.exports = router;