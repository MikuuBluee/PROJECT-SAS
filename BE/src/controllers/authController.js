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
            
            const token = jwt.sign({ user_id: newUserId, email }, JWT_SECRET, { expiresIn: '1d' });

            res.status(201).json({ message: 'Registrasi berhasil', token, user: { id: newUserId, email, nama}})
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);

    authModel.getUserByEmail(email, (err, user) => {
        if(err) return res.status(500).json({ error: err.message });
        if(!user) return res.status(400).json({ error: 'Email tidak ditemukan' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) return res.status(401).json({ error: 'Password salah' });

        const token = jwt.sign({ user_id:user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'Login berhasil', token });
    })
}

exports.checkSession = (req, res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.json({ loggedIn: false });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.json({ loggedIn: false });
        }

        res.json({ loggedIn: true, user });
    });
};