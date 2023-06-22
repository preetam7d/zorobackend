const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const products = require('./routes/products');
const user = require('./routes/user');
const orders = require('./routes/order');

//initilze express.js
const app = express();
//to receive json data
app.use(express.json());
//initilze cors 
app.use(cors({
    origin: '*'
}));

//connect mongobd
mongoose.connect('mongodb+srv://ecommerece:ecommerece@cluster0.lkde3eu.mongodb.net/?retryWrites=true&w=majority').then(
    console.log("Db is connected")
);

//auth api's
app.use('/api/auth', auth);
//products api's
app.use('/api/products', products);
//user api's
app.use('/api/user', user);
//order api's
app.use('/api/order', orders);




//run server
app.listen(5000, () => console.log('server is running'));