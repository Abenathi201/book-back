const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);

const CONNECTION_URL = 'mongodb+srv://Book_Vault:bookvault@node-basics.kc9afxh.mongodb.net/';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));