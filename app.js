const express = require('express');
const cors = require('cors'); // CORS => Cross Origin Resource Sharing
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);


module.exports = app;