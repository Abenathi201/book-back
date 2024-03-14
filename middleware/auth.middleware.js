const jwt = require('express-jwt');
const secret = 'book_vault_secret-key';

module.exports = jwt({ secret, algorithms: ['HS256'] });