const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DB = 'mongodb+srv://bolendra:bolendra123@cluster0.tvosvfd.mongodb.net/Intoglo?retryWrites=true&w=majority'


mongoose.connect(DB).then(() => {
    console.log(`MongoDB-Successsfully connected`);
}).catch((err) =>
    console.log('Not connected'));

app.use('/', routes);

app.listen(process.env.Port || 4000, function() {
    console.log('App Running on Port ' + (process.env.Port || 4000));
})