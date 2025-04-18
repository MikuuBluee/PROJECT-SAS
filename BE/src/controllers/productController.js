const product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    product.getAllProduct((err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        } else{
            res.json(result);
        }
    })
}

exports.getProductsById = (req, res) => {
    const { id } = req.params;
    product.getProductById(id, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        } else{
            res.json(result[0]);
        }
    })
}

exports.createProduct = (req, res) => {
    const newProduct = req.body;
    product.createProduct(newProduct, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        } else{
            res.status(201).json({ message: 'Product Created Successfully', userId: result.insertId});
        }
    })
}

exports.updateProductById = (req, res) => {
    const { id } = req.params;
    const newProductAfterUpdate = req.body;
    product.updateProductById(newProductAfterUpdate, id, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        } else{
            res.status(201).json({ message: 'Product Update Successfully'});
        }
    })
}

exports.deleteProductById = (req, res) => {
    const { id } = req.params;
    product.deleteProductById(id, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        } else{
            res.status(201).json({ message: 'Product Delete Successfully'});
        }
    })
}