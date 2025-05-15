const chart = require('../models/chartModel');

exports.addChartitem = (req, res) => {
    const { user_id, variant_id, jumlah_barang } = req.body;

        chart.addChartItem({ user_id, variant_id, jumlah_barang }, (err, result) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(201).json({ message: 'Item ditambahkan ke keranjang' });
            }
        });
    };
;

exports.getChartItem = (req, res) => {
    const { id } = req.params;
    chart.getChartItem(id, (err, items) => {
        if(err){
            res.status(500).json({ error: err.message });
        }else{
            res.status(201).json(items);
        }
    });
};

exports.deleteChartItem = (req, res) => {
    const { id } = req.params;
    chart.deleteChartItem(id, (err) => {
        if(err){
            res.status(500).json({ error: err.message });
        }else{
            res.status(201).json({ message: 'Keranjang dibersihkan' });
        }
    });
};