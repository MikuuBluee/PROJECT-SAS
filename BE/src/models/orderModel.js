const db =  require('../config/db');
const { deleteChartItem } = require('./chartModel');

exports.createOrder = (orderData, callback) => {
    const queryOrders = 'INSERT INTO orders (user_id, total_harga, status) VALUES (?, ?, ?)';
    db.query(queryOrders, [orderData.user_id, orderData.total_harga, 'tertunda'], (err, result) => {
        if(err) return callback(err);

        const order_id = result.insertId;

        const items = orderData.items.map(item => [
            order_id,
            item.variant_id,
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