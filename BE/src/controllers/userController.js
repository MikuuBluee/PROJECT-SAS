const user = require('../models/userModel');

exports.getUser = (req, res) => {
    user.getAllUsers((err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    user.getUserById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result[0]);
        }
    });
};

exports.createUser = (req, res) => {
    const newUser = req.body;
    user.createUser(newUser, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: "User Created Successfully", userId: result.insertId});
        }
    });
};

exports.updateUserById = (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    user.updateUserById(newUser, id, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        } else{
            res.status(201).json({ message: "User Update Successfully" })
        }
    })
};

exports.deleteUserById = (req, res) => {
    const { id } = req.params;
    user.deleteUserById(id, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        }else{
            res.status(201).json({ message: 'User Delete Successfully'});
        }
    })
}