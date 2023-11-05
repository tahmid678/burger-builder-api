const express = require('express');
const Order = require('../models/orders');
const authorize = require('../middlewares/authorize');
const router = express.Router();

const newOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        return res.status(200).send('Order placed successfully!');
    } catch (err) {
        return res.status(400).send('Sorry, Something went wrong!');
    }
}

const orderList = async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).sort({ orderTime: -1 });
    res.status(200).send(orders);
}


router.route('/')
    .get(authorize, orderList)
    .post(authorize, newOrder);

module.exports = router;