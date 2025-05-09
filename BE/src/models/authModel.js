const db = require('../config/db');

exports.getUserByEmail = (email, callback) => {
    const query = `SELECT * FROM users WHERE email=? LIMIT 1`;
    db.query(query, [email], (err, result) => {
        if(err) return callback(err);
        callback(null, result[0]);
    });
};

exports.createUser = (userData, callback) => {
    const query = `INSERT INTO users (nama, email, password, telepon, alamat, role) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [userData.nama, userData.email, userData.password, userData.telepon, userData.alamat, 'user'], (err, result) => {
        if(err) return callback(err);
        callback(null, result.insertId);
    });
};