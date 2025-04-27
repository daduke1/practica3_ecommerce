const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  getOrders,
  getOrder,
  createOrder,
} = require('../controllers/orders');

router.use(protect);

router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);

module.exports = router;