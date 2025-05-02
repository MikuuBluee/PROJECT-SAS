const db =  require('../config/db');
const { deleteChartItem } = require('./chartModel');

// exports.addTempItem = (data, callback) => {
//     const query = 'INSERT INTO order_items (product_id, quantity, subtotal, is_temp) VALUES (?, ?, ?, true)';
//     db.query(query, [data.product_id, data.quantity, data.subtotal], callback);
// };

// exports.getTempitems = (callback) => {
//     const query = `
//     SELECT order_items.*, products.nama, products.harga
//     FROM order_items
//     JOIN products ON order_items.product_id = products.id
//     WHERE is_temp = true`;
//     db.query(query, callback);
// };

// exports.createOrders = (user_id, totalHarga, callback) => {
//     const query = 'INSERT INTO orders (user_id, total_harga) VALUES (?, ?)';
//     db.query(query, [user_id, totalHarga], callback);
// };

// exports.clearTempItem = (id, callback) => {
//     const query = 'DELETE FROM order_items WHERE id=?';
//     db.query(query, [id], callback);
// };

// exports.finalizeItems = (id, itemIds, callback) => {   
//     const placeholders = itemIds.map(() => '?').join(',');
//     const query = `UPDATE order_items SET is_temp=false, order_id=? WHERE id IN (${placeholders})`;
//     db.query(query, [id, ...itemIds], callback);
// };

// exports.getOrderByUser = (id, callback) => {
//     const query = `
//     SELECT * FROM orders
//     WHERE user_id=?
//     ORDER BY  created_at DESC`;
//     db.query(query, [id], callback);
// };

// exports.getOrderDetail = (id, callback) => {
//     const query = `
//     SELECT oi.*, p.nama AS product_name, p.harga
//     FROM order_items oi
//     JOIN products p ON oi.product_id=p.id
//     WHERE oi.order_id=? AND oi.is_temp=false`;
//     db.query(query, [id], callback);
// };

// exports.clearOrderById = (id, callback) => {
//     const query = 'DELETE FROM orders WHERE id=?';
//     db.query(query, [id], callback);
// };

// exports.deleteChartById = (id, callback) => {
//     const query = 'DELETE FROM order_items WHERE id=?'
//     db.query(query, [id], callback)
// }

exports.createOrder = (orderData, callback) => {
    const queryOrders = 'INSERT INTO orders (user_id, total_harga, status) VALUES (?, ?, ?)';
    db.query(queryOrders, [orderData.user_id, orderData.total_harga, 'tertunda'], (err, result) => {
        if(err) return callback(err);

        const order_id = result.insertId;

        const items = orderData.items.map(item => [
            order_id,
            item.variant_id,
            item.jumlah_barang,
            item.product_harga * item.jumlah_barang
        ]);

        const queryItems = 'INSERT INTO order_items (order_id, variant_id, quantity, subtotal) VALUES ?';
        db.query(queryItems, [items], (err2) => {
            if(err2) return callback(err2);

            const chartId = orderData.chart_id;
            if(chartId.length > 0){
                const queryDeleteChart = `DELETE FROM charts WHERE id IN (${chartId.map(() => '?').join(',')})`;
                db.query(queryDeleteChart, chartId, (err3) => {
                    if(err3) return callback(err3);
                    callback(null, { order_id });
                });
            }else{
                callback(null, { order_id });
            }
        }); 
    });
};