const express = require('express');
const router = express.Router();

const { getCartItems, addCartItems } = require('../controllers/cart.js');

// Get cart items
router.get('/:userId', getCartItems);

// Add cart items
router.post('addCartItem/:userId', addCartItems);

module.exports = router;