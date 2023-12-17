const express = require('express');
const authorize = require('../middlewares/authorize');
const router = express.Router();
const PaymentSession = require('ssl-commerz-node').PaymentSession;
const { User } = require('../models/user');
const { Order } = require('../models/orders');

const initPayment = async (req, res) => {
    const userId = req.user._id;
    const userEmail = req.user.email;
    const totalPrice = req.body.totalPrice;
    // const order = await Order.find({ userId: userId });
    const user = await User.find({ _id: userId });
    const payment = new PaymentSession(true, process.env.STORE_ID, process.env.STORE_PASSWORD);
    const trans_id = '_' + Math.random().toString(36).substr(2, 9) + (new Date()).getTime();

    // Set the urls
    payment.setUrls({
        success: "yoursite.com/success", // If payment Succeed
        fail: "yoursite.com/fail", // If payment failed
        cancel: "yoursite.com/cancel", // If user cancel payment
        ipn: "yoursite.com/ipn", // SSLCommerz will send http post request in this link
    });

    // Set order details
    payment.setOrderInfo({
        total_amount: totalPrice, // Number field
        currency: "BDT", // Must be three character string
        tran_id: trans_id, // Unique Transaction id
        emi_option: 0, // 1 or 0
    });

    // Set customer info
    payment.setCusInfo({
        name: user.email,
        email: user.email,
        add1: "144, East Kazipara, Mirpur",
        add2: "Dhaka",
        city: "Dhaka",
        state: "Optional",
        postcode: 1216,
        country: "Bangladesh",
        phone: "010000000000",
        fax: user.email,
    });

    // Set shipping info
    payment.setShippingInfo({
        method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
        num_item: 1,
        name: user.email,
        add1: "144, East Kazipara, Mirpur",
        add2: "Dhaka",
        city: "Dhaka",
        state: "Optional",
        postcode: 1216,
        country: "Bangladesh",
    });

    // Set Product Profile
    payment.setProductInfo({
        product_name: "Burger",
        product_category: "Fastfood",
        product_profile: "general",
    });

    const response = await payment.paymentInit();
    console.log(response);
    return res.status(200).send(response);
}

router.route('/')
    .post(authorize, initPayment);

module.exports = router;