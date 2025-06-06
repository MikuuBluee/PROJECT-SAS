const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductsById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);
router.post('/size', productController.addSize);
router.get('/size', productController.getSizeProduct);
router.delete('/size/:id', productController.deleteSize);

module.exports = router;