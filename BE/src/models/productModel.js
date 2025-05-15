const db = require('../config/db');

const product = {
    getAllProduct: (callback) => {
        db.query('SELECT * FROM products', callback);
    },

    getProductById: (id, callback) => {
        db.query('SELECT * FROM products WHERE id=?', [id], callback);
    },

    createProduct: (data, callback) => {
        const { nama, description, harga, stock, category_id, image_url } = data;
        db.query(
            'INSERT INTO products (nama, description, harga, stock, category_id, image_url) VALUES (?,?,?,?,?,?)',
            [nama, description, harga, stock, category_id, image_url],
            callback
        );
    },

    updateProductById: (data, id, callback) => {
        const { nama, description, harga, stock, category_id, image_url} = data;
        db.query(
            'UPDATE products SET nama=?, description=?, harga=?, stock=?, category_id=?, image_url=? WHERE id=?',
            [nama, description, harga, stock, category_id, image_url, id],
            callback
        );
    },

    deleteProductById: (id, callback) => {
        db.query('DELETE FROM products WHERE id=?', [id], callback);
    },

    addSize: (data, callback) => {
        const { product_id, size, stock } = data;
        db.query(
            'INSERT INTO product_variants (product_id, size, stock) VALUES (?, ?, ?)',
            [product_id, size, stock],
            callback
        );
    },

    getSizeProduct: (callback) => {
        db.query('SELECT * FROM product_variants', callback);
    },

    deleteSize: (id, callback) => {
        db.query('DELETE FROM product_variants WHERE id=?', [id], callback);
    }
}

module.exports = product;