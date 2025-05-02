const db = require('../config/db');

const user = {
    getAllUsers: (callback) => {
        db.query("SELECT * FROM users", callback);
    },

    getUserById: (id, callback) => {
        db.query("SELECT * FROM users WHERE id=?", [id], callback);
    },

    createUser: (user, callback) => {
        const { nama, email, password, telepon, alamat} = user;
        db.query(
            "INSERT INTO users (nama, email, password, telepon, alamat, role) VALUES (?, ?, ?, ?, ?, ?)",
            [nama, email, password, telepon, alamat, 'user'],
            callback
        );
    },

    updateUserById: (user, id, callback) => {
        const { nama, email, password, telepon, alamat, role } = user;
        db.query(
            'UPDATE users SET nama=?, email=?, password=?, telepon=?, alamat=?, role=? WHERE id=?',
            [nama, email, password, telepon, alamat, role, id],
            callback
        );
    },

    deleteUserById: (id, callback) => {
        db.query('DELETE FROM users WHERE id=?', [id], callback);
    }
};

module.exports = user;