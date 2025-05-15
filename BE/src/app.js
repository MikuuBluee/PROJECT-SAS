const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const kategoriRoutes = require('./routes/kategoriRoutes');
const orderRoutes = require('./routes/orderRoutes');
const chartRoutes = require('./routes/chartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../FE')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/FE', 'index.html'));
})

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', kategoriRoutes); 
app.use('/orders', orderRoutes);
app.use('/charts', chartRoutes);
app.use('/payment', paymentRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});