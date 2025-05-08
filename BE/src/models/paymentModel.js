const { va } = require('midtrans-client/lib/snapBi/snapBi');
const db = require('../config/db');

exports.getTotalHargaByOrderId = (order_id, callback) => {
    const query = `SELECT total_harga FROM orders WHERE id=?`;
    db.query(query, [order_id], (err, result) => {
        if(err) return callback(err);
        if(result.length === 0) return callback(new Error('Order tidak ditemukan'));
        callback(null, result[0].total_harga);
    });
};

exports.savePayment = (paymentData, callback) => {
    const query = `
    INSERT INTO payments (order_id, midtrans_order_id, jumlah_transaksi, method, token_snap, redirect_url)
    VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
        paymentData.order_id,
        paymentData.midtrans_order_id,
        paymentData.jumlah_transaksi,
        paymentData.method,
        paymentData.token_snap,
        paymentData.redirect_url
    ];

    db.query(query, values, (err, result) => {
        if(err) return callback(err);
        callback(null, result.insertId);
    });
};

exports.updateStatusByMidtransOrderId = (midtrans_order_id, status, callback) => {
    const query = `UPDATE payments SET status=? WHERE midtrans_order_id=?`;
    db.query(query, [status, midtrans_order_id], (err, result) => {
        if(err) return callback(err);
        callback(null, result);
    });
};