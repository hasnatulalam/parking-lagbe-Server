const mongoose =require("mongoose");

const connectDB = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://hasibul:hasib@cluster0.cu5ytfs.mongodb.net/parkinglagbe?retryWrites=true&w=majority"
   
  );
  if (res) {
    console.log("connected Successfully");
  }
};

module.exports =connectDB;
