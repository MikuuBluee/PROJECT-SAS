const midtransClient = require('midtrans-client');
const paymentModel = require('../models/paymentModel');
const userModel = require('../models/userModel');

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-XcBiNR07gsIqQujX53_OmhnL',
    clientKey: 'SB-Mid-client-o7wo4enBNocWz-lC'
    // serverKey: 'Mid-server-mIDe4Xc46zy7F0_la4Rc19Iz',
    // clientKey: 'Mid-client-DhzFbU7-gBWPYbI6'
});

exports.createPayment = (req, res) => {
    const { user_id, order_id, method } = req.body;
    const midtrans_order_id = `ORDER-${Date.now()}`;

    paymentModel.getTotalHargaByOrderId(order_id, (err, totalHarga) => {
        if(err) return res.status(500).json({ error: err.message });

        userModel.getUserById(user_id, (err, userResult) => {
            if(err) return res.status(500).json({ error: err.message });
            if(userResult.length === 0) return res.status(404).json({ error: 'User not found' });
    
            const user = userResult[0];
    
            const parameter = {
                transaction_details: {
                    order_id: midtrans_order_id,
                    gross_amount: totalHarga
                },
                payment_type: method === 'QRIS' ? 'qris' : 'bank_transfer',
                customer_details: {
                    name: user.nama,
                    email: user.email
                }
            };
    
            snap.createTransaction(parameter)
                .then(transaction => {
                    const token = transaction.token;
                    const redirect_url = transaction.redirect_url;
    
                    const paymentData = {
                        order_id,
                        midtrans_order_id,
                        jumlah_transaksi: totalHarga,
                        method,
                        token_snap: token,
                        redirect_url
                    };
    
                    paymentModel.savePayment(paymentData, (err, insertId) => {
                        if(err) return res.status(500).json({ error: err.message });
                        res.status(201).json({
                            message: 'Transaksi berhasil dibuat',
                            payment_id: insertId,
                            token_snap: token,
                            redirect_url
                        });
                    });
                })
                .catch(err => {
                    res.status(500).json({ error: err.message });
                });
        });

    });

};

exports.midtransNotification = (req, res) => {
    const notificationJson = req.body;

    const transactionStatus = notificationJson.transaction_status;
    const midtransOrderId  = notificationJson.order_id;

    let newStatus;

    switch (transactionStatus) {
        case 'settlement':
            newStatus = 'penyelesaian';
            break;
        case 'pending':
            newStatus = 'tertunda';
            break;
        case 'expired':
            newStatus = 'kadaluwarsa';
            break;
        case 'cancel':
            newStatus = 'batal';
            break;
        case 'deny':
            newStatus = 'ditolak';
            break;
        case 'failure':
            newStatus = 'gagal';
            break;
        default:
            newStatus = 'tertunda';
    }

    paymentModel.updateStatusByMidtransOrderId(midtransOrderId, newStatus, (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Notifikasi diproses' });
    });
};