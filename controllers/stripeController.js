const Stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
const express =require("express")
const dotenv =require("dotenv");


dotenv.config();

const stripe =Stripe(process.env.STRIPE_KEY)

const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY


const stripePayment =async  (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};




module.exports ={stripePayment}