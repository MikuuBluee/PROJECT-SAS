const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// router.post('/temp', orderController.addTempItem);
// router.get('/temp', orderController.getItemTemp);
// router.delete('/temp/:id', orderController.clearTempItem);
// router.post('/checkout', orderController.checkout);
// router.get('/user/:id', orderController.getOrderByUser);
// router.get('/order/:id', orderController.getOrderDetail);
// router.delete('/order/:id', orderController.clearOrderById);
// router.delete('/chart/:id', orderController.deleteChartById);
router.post('/checkout', orderController.checkout);
router.get('/', orderController.getDetailOrder);

module.exports = router;