const db =  require('../config/db');

exports.createKategori = (data, callback) => {
    const { nama } = data;
    const query = 'INSERT INTO categories (nama) VALUES (?)';
    db.query(query, [nama], callback);
}

exports.getKategori = (callback) => {
    const query = 'SELECT * FROM categories'
    db.query(query, callback);
}

exports.updateKategori = (data, id, callback) => {
    const { nama } = data;
    const query = 'UPDATE categories SET nama=?';
    db.query(query, [nama, id], callback);
}

exports.deleteKategori = (id, callback) => {
    const query = 'DELETE FROM categories WHERE id=?'
    db.query(query, [id], callback);
}