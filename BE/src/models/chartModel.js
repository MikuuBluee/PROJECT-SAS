const db = require('../config/db');

exports.addChartItem = (data, callback) => {
    const getHargaProduct = 'SELECT harga FROM products WHERE id=?';
    db.query(getHargaProduct, [data.product_id], (err, results) => {
        if(err){
            console.log("gagal ambil harga: ", err);
            return callback(err);
        }
        if(results.length === 0){
            return callback(new callback('Produk tidak ditemukan'));
        }

        const product_harga = results[0].harga;
        console.log("harga produk: ", product_harga);

    const query = 'INSERT INTO charts (user_id, product_id, product_harga, jumlah_barang) VALUES (?, ?, ?, ?)';
    db.query(query, [data.user_id, data.product_id, product_harga, data.jumlah_barang], callback);
});
};

exports.getChartItem = (id, callback) => {
    const query = `
    SELECT charts.*, products.nama, products.harga
    FROM charts
    JOIN products ON charts.product_id=products.id
    WHERE charts.user_id=?`;
    db.query(query, [id], callback);
};

exports.deleteChartItem = (id, callback) => {
    const query = 'DELETE FROM charts WHERE id=?';
    db.query(query, [id], callback);
};