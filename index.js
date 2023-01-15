const express = require("express")
const connectDB = require("./config/db.js")
const authRoutes = require("./routes/authRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const parkingRoutes = require("./routes/parkingRoutes")
const parkingSlotRoutes = require("./routes/parkingSlotRoutes")

const reviewRoutes = require("./routes/reviewRoutes")
const complainRoutes = require("./routes/complainRoutes")
const paymentRoute = require("./routes/paymentRoute")

const dotenv = require("dotenv")
const cors = require("cors")
const { v4: uuidv4 } = require('uuid');
const SSLCommerzPayment = require('sslcommerz')
const { getMaxListeners } = require("./models/authModel.js")
const paymentModel = require("./models/paymentModel.js")

const app = express()

dotenv.config()

const PORT = process.env.PORT || 8000
connectDB()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Initialize payment
app.get('/init', async (req, res) => {
  
  const data = {
      total_amount: 100,
      currency: 'BDT',
      tran_id: uuidv4(),
      success_url: 'http://localhost:8000/success',
      fail_url: 'http://localhost:8000/failure',
      cancel_url: 'http://localhost:8000/cancel',
      ipn_url: 'http://localhost:8000/ipn',
      paymentStatus: 'pending',
      shipping_method: 'Courier',
      product_name: 'AC',
      product_category: 'Electronic',
      product_profile: 'general',
    
     
      cus_name: 'hasib',
      cus_email: 'hasibulalam079@gmail.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'ship',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
      multi_card_name: 'mastercard',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D'
  };
  const sslcommerc =new SSLCommerzPayment(process.env.Store_ID,process.env.Store_Password,false)
  sslcommerc.init(data).then(data=>{
    res.redirect(data.GatewayPageURL)

  });
})
app.post("/success", async (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body)
 
  })


app.post("/failure", async (req, res) => {
  console.log(req.body);
  res.status(400).json(req.body)

})
app.post("/cancel", async (req, res) => {
  
  console.log(req.body);
  res.status(400).json(req.body)

})


app.get("/", (req, res) => {
  res.send("Backend is Running..")
})

// Routes

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/parking", parkingRoutes)
app.use("/api/parkingSlot", parkingSlotRoutes)

app.use("/api/review", reviewRoutes)
app.use("/api/complain", complainRoutes)
app.use("/api/payment", paymentRoute)
app.use("/api/payment", paymentRoute)


app.listen(PORT, () => {
  console.log(`APi is Running on http://localhost:${PORT}`)
})
