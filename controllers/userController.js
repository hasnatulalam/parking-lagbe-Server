const  authModel =require("../models/authModel.js");




//GET USER
const getUser = async (req, res) => {
  try {
    const user = await authModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
  };

  //Delete Specific User
  const deleteUser = async (req, res) => {
    try {
      const user = await authModel.findById(req.params.id);
      
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
    };

//GET ALL USER
const getAllUsers= async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await authModel.find().sort({ _id: -1 }).limit(5)
        : await authModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  };

   //GET USER STATS

const userStats= async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await authModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
};

const MakeAdmin = async (req,res)=>{
  try {
    const  MakeAdmin = await authModel.findByIdAndUpdate(
      req.params.id,
      { $set: {
       isAdmin:"true",
      } },
      { upsert: true }
    );
    res.status(200).json(MakeAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
}

  module.exports={
    getUser,
    getAllUsers,
    userStats,
    deleteUser,
    MakeAdmin,
  }