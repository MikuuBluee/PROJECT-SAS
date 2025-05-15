const kategori = require('../models/kategoriModel');

exports.getKategori = (req, res) => {
    kategori.getKategori((err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createKategori = (req, res) => {
    const newKategori = req.body;
    kategori.createKategori(newKategori, (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Create categories successfully' });
    })
}

exports.updateKategori = (req, res) => {
    const { id } = req.params;
    const newKategoriAfterUpdate = req.body;
    kategori.updateKategori(id, newKategoriAfterUpdate, (err, result) => {
        if(err) return res.json(500).json({ error: err.message });
        res.status(201).json({ message: 'Update categories successfully' });
    })
}

exports.deleteKategori = (req, res) => {
    const { id } = req.params;
    kategori.deleteKategori(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Delete categories successfully' });
    })
}