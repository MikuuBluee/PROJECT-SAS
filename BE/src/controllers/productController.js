const product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    const category_id = req.query.category_id;
    product.getAllProduct(category_id, (err, result) => {
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
            res.status(201).json({ message: 'Product Created Successfully'});
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
            res.status(200).json({ message: 'Product Update Successfully'});
        }
    })
}

exports.deleteProductById = (req, res) => {
    const { id } = req.params;
    product.deleteProductById(id, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        } else{
            res.status(200).json({ message: 'Product Delete Successfully'});
        }
    })
}

exports.addSize = (req, res) => {
    const size = req.body;
    product.addSize(size, (err, result) => {
        if(err){
            res.status(500).json({ error:err.message });
        }else{
            res.status(201).json({ message: 'Add size success', });
        }
    })
}

exports.getSizeProduct = (req, res) => {
    product.getSizeProduct((err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        }else{
            res.json(result);
        }
    })
}

exports.deleteSize = (req, res) => {
    const { id } = req.params;
    product.deleteSize(id, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        }else{
            res.status(200).json({ message: 'Size delete success' });
        }
    })
}