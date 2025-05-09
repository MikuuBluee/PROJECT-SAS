const order = require('../models/orderModel');
const chart = require('../models/chartModel');
const db = require('../config/db');

exports.checkout = (req, res) => {
    const { user_id, chart_id } = req.body;

    if(!chart_id || chart_id.length === 0){
        return res.status(400).json({ error: 'Tidak ada item yang dipilih untuk checkout' });
    }

    const query = `SELECT * FROM charts WHERE id IN (${chart_id.map(() => '?').join(',')})`;
    db.query(query, chart_id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message });

        const total_harga =result.reduce((acc, item) => acc + (item.product_harga * item.jumlah_barang), 0);

        const orderData = {
            user_id,
            total_harga,
            items: result,
            chart_id,
        };

        order.createOrder(orderData, (err2, createdOrder) => {
            if(err2) return res.status(500).json({error: err2.message});
            res.status(201).json({ message: 'Checkout Berhasil', order_id: createdOrder.order_id });
        });
    });
};

exports.getDetailOrder = (req, res) => {
    order.getDetailOrder((err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}