const order = require('../models/orderModel');
const chart = require('../models/chartModel');
const db = require('../config/db');

// exports.addTempItem = (req, res) => {
//     const { product_id, quantity, subtotal } = req.body;
//     order.addTempItem({ product_id, quantity, subtotal }, (err, result) => {
//         if(err){
//             res.status(500).json({ error: err.message });
//         }else {
//             res.status(201).json({ message: 'Item ditambahkan ke keranjang' });
//         }
//     });
// };

// exports.getItemTemp = (req, res) => {
//     order.getTempitems((err, items) => {
//         if(err){
//             res.status(500).json({ error: err.message });
//         } else{
//             res.json(items)
//         }
//     });
// };

// exports.checkout = (req, res) => {
//     const { user_id, itemIds, total_harga } = req.body;
//     // console.log('ITEM IDS:', itemIds);
//     order.createOrders(user_id, total_harga, (err, result) => {
//         if(err) {
//             return res.status(500).json({ error: err.message });
//         }

//         const id = result.insertId;
//         order.finalizeItems(id, itemIds, (err2) => {
//             if(err2) {
//                 return res.status(500).json({ error: err2.message });
//             }else{
//                 res.status(201).json({ message: 'Order berhasil dibuat', order_id: id });
//             }
//         });
//     });
// };

// exports.clearTempItem = (req, res) => {
//     const { id } = req.params;
//     order.clearTempItem(id, (err) => {
//         if(err){
//             res.status(500).json({ error: err.message });
//         }else{
//             res.status(201).json({ message: 'Keranjang dibersihkan' });
//         }
//     });
// };

// exports.getOrderByUser = (req, res) => {
//     const { id } = req.params;
//     order.getOrderByUser(id, (err, orders) => {
//         if(err){
//             res.status(500).json({ error: err.message});
//         }else {
//             res.json(orders)
//         }
//     });
// };

// exports.getOrderDetail = (req, res) => {
//     const { id } = req.params;
//     order.getOrderDetail(id, (err, items) => {
//         if(err){
//             res.status(500).json({ error: err.message});
//         }else{
//             res.json(items);
//         }
//     })
// };

// exports.clearOrderById = (req, res) => {
//     const { id } = req.params;
//     order.clearOrderById(id, (err) => {
//         if(err) {
//             res.status(500).json({ error: err.message });
//         } else{
//             res.status(201).json({ message: 'Order berhasil dibatalkan'})
//         }
//     })
// };

// exports.deleteChartById = (req, res) => {
//     const { id } = req.params;
//     order.deleteChartById(id, (err) => {
//         if(err){
//             res.status(500).json({ error: err.message });
//         }else{
//             res.status(201).json({ message: 'Item berhasil dihapus dari keranjang' });
//         }
//     })
// }

exports.checkout = (req, res) => {
    const { user_id, chart_ids } = req.body;

    if(!chart_ids || chart_ids.length === 0){
        return res.status(400).json({ error: 'Tidak ada item yang dipilih untuk checkout' });
    }

    const query = `SELECT * FROM charts WHERE id IN (${chart_ids.map(() => '?').join(',')})`;
    db.query(query, chart_ids, (err, result) => {
        if(err) return res.status(500).json({ error: err.message });

        const total_harga =result.reduce((acc, item) => acc + (item.product_harga * item.jumlah_barang), 0);

        const orderData = {
            user_id,
            total_harga,
            items: result,
            chart_ids,
        };

        order.createOrder(orderData, (err2, createdOrder) => {
            if(err2) return res.status(500).json({error: err2.message});
            res.status(201).json({ message: 'Checkout Berhasil', order_id: createdOrder.order_id });
        });
    });
};