const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authModel = require('../models/authModel');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = (req, res) => {
    const { nama, email, password, telepon, alamat } = req.body;

    if(!nama || !email || !password || !telepon || !alamat) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi' });
    }

    authModel.getUserByEmail(email, (err, user) => {
        if(err) return res.status(500).json({ error: err.message });
        if(user) return res.status(400).json({ error: 'Email sudah terdaftar' });

        const hashedPassword = bcrypt.hashSync(password, 10);

        authModel.createUser({ nama, email, password: hashedPassword, telepon, alamat }, (err, newUserId) => {
            if(err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Registrasi berhasil', user_id: newUserId });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    authModel.getUserByEmail(email, (err, user) => {
        if(err) return res.status(500).json({ error: err.message });
        if(!user) return res.status(400).json({ error: 'Email tidak ditemukan' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) return res.status(401).json({ error: 'Password salah' });

        const token = jwt.sign({ user_id:user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'Login berhasil', token });
    })
}