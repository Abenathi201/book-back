const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/Users.js');

const router = express.Router();

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user
const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findOne({ _id: userId });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Register a user
const register = async (req, res) => {
    try {
        const { email, profileImg, password } = req.body;
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const newUser = new Users({ email, profileImg, password });
        await newUser.save();
        res.status(201).json({ message: 'User successfully registered' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(404).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ email: user.email, userId: user._id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { email, profileImg, password } = req.body;
        const user = await Users.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) {
            user.email = email;
        }

        if (profileImg) {
            user.profileImg = profileImg;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await Users.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    router,
    getUsers,
    getUser,
    register,
    login,
    updateUser,
    deleteUser
}