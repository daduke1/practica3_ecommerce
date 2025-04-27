const express = require('express');
const router = express.Router();
const users = require('./users');
const products = require('./products');
const orders = require('./orders');

router.use('/users', users);
router.use('/products', products);
router.use('/orders', orders);

module.exports = router;