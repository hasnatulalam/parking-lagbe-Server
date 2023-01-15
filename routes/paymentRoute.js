const express = require("express")
const parkingModel = require("../models/parkingModel")
const router = express.Router()
require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const paymentModel = require('../models/paymentModel')



router.get('/user', async (req, res) => {
    const { id } = req.query

    try {
        const user = await paymentModel.find({ user: id })
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(401).send({ success: false })
        }
    } catch (e) {
        console.log(e.message)
    }

})

router.post('/', async (req, res) => {
    const { trxId, user, date, location, slots } = req.body

    try {
        const payment = new paymentModel({
            trxId,
            user,
            bookingDate: date,
            bookingLocation: location,
            slots
        })
        await payment.save()
        res.status(200).send({ success: true })
    } catch (e) {
        console.log(e.message)
    }
})

router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method_types: ['card']
    })

    res.send({ clientSecret: paymentIntent.client_secret })
})
router.get("/income",  async (req, res) => {
  const parkingId = req.params.parkingid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await parkingModel.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(parkingId && {
              parkings: { $elemMatch: { parkingId} },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router