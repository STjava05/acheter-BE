const express = require("express");
const router = express.Router();
require("dotenv").config();
const Stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);





router.post("/payment", async (req, res) => {
    try {
        const { amount, id } = req.body;
    
        const payment = await Stripe.paymentIntents.create({
        amount,
        currency: "EUR",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
        });
    
        console.log(payment);
    
        res.json({
        message: "Payment successful",
        success: true,
        });
    } catch (error) {
        console.log(error);
        res.json({
        message: "Payment failed",
        success: false,
        });
    }
    });

module.exports = router;