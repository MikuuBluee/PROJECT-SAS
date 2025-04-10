const db =  require('../config/db');

exports.addTempItem = (data, callback) => {
    const query = 'INSERT INTO order_items (product_id, quantity, subtotal, is_temp) VALUES (?, ?, ?, true)';
    db.query(query, [data.product_id, data.quantity, data.subtotal], callback);
};

exports.getTempitems = (callback) => {
    const query = `
    SELECT order_items.*, products.nama, products.harga
    FROM order_items
    JOIN product ON order_items.product_id = products.id
    WHERE is_temp = true`;
    db.query(query, callback);
};

exports.createOrders = (userId, totalHarga, callback) => {
    const query = 'INSERT INTO orders (user_id, total_harga) VALUES (?, ?)';
    db.query(query, [userId, totalHarga], callback);
};

exports.clearTempItem = (callback) => {
    const query = 'DELETE FROM order_items WHERE is_temp=true';
    db.query(query, callback);
};

exports.finalizeItems = (orderId, callback) => {
    const query = 'UPDATE order_items SET is_temp=false, order_id=?, WHERE is_temp=true';
    db.query(query, [orderId], callback);
};