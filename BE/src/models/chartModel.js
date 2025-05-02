const db = require('../config/db');

exports.addChartItem = (data, callback) => {
    const getHargaProduct = `
    SELECT p.harga
    FROM product_variants pv
    JOIN products p ON pv.product_id=p.id
    WHERE pv.id=?`;
    db.query(getHargaProduct, [data.variant_id], (err, results) => {
        if(err) return callback(err);
        console.log("Hasil query harga dari variant:", results);
        if(results.length === 0) return callback(new Error('Size tidak ditemukan'));

        const product_harga = results[0].harga;
        console.log("harga produk: ", product_harga);

    const query = 'INSERT INTO charts (user_id, variant_id, product_harga, jumlah_barang) VALUES (?, ?, ?, ?)';
    db.query(query, [data.user_id, data.variant_id, product_harga, data.jumlah_barang], callback);
});
};

exports.getChartItem = (id, callback) => {
    const query = `
    SELECT charts.id AS chart_id, charts.jumlah_barang,
    pv.size, p.nama, p.harga, p.image_url
    FROM charts
    JOIN product_variants pv ON charts.variant_id=pv.id
    JOIN products p ON pv.product_id=p.id
    WHERE charts.user_id=?`;
    db.query(query, [id], callback);
};

exports.deleteChartItem = (id, callback) => {
    const query = 'DELETE FROM charts WHERE id=?';
    db.query(query, [id], callback);
};