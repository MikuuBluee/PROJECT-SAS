exports.checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Akses ditolak, role tidak sesuai' });
        }
        next();
    };
};
