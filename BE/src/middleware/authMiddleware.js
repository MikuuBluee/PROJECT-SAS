const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Token tidak ditemukan' });
    }

    const token = bearerHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({ error: 'Token tidak valid' });
    }
};