const express =require("express")
const  connectDB= require ("./config/db.js");
const  authRoutes =require("./routes/authRoutes.js");
const userRoutes =require("./routes/userRoutes.js");
const parkingRoutes =require("./routes/parkingRoutes");
const parkingSlotRoutes= require("./routes/parkingSlotRoutes")

 const dotenv =require("dotenv");
 const cors =require("cors")

const app = express();

dotenv.config();

const PORT = process.env.PORT || 9000;
connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is Running..");
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/parking",parkingRoutes)
app.use("/api/parkingSlot",parkingSlotRoutes)


app.listen(PORT, () => {
  console.log(`APi is Running on http://localhost:${PORT}`);
});