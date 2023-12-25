const express = require("express");
const User = require("../dbConnectioin/User");
const { createToken, virifiToken } = require("../module/jwt");
const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const getresponce = await User.find().populate("cart");
    res.status(200).send(getresponce);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong" });
  }
});

router.post("/createacc", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkuser = await User.findOne({ email }).populate("cart");
    if (checkuser) {
      return res.status(403).json({ message: "invalid email already exist" });
    }
    const getresponce = new User(req.body);
    await getresponce.save();
    res.status(200).json({ message: "insertion done" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const getresponce = await User.findOne({ email }).populate("cart");
    if (!getresponce) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    if (getresponce.password !== password) {
      return res.status(401).json({ message: "Invelid password" });
    }
    const token = createToken(getresponce._id.toString());
    res.status(200).json({ token: token, message: "loging successful" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong" });
  }
});

router.get("/",virifiToken, async (req, res) => {
  try {
    // const getresponce = await User.findOne({ _id: req.userData[0]._id }).populate(
      // "cart"
    // );
    let {name,addresses} = req.userData[0];
    res.status(200).send({name,addresses});
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong" });
  }
});

router.post("/orderinfo",virifiToken,async(req,res)=>{
  try {
    let {PickDate,SelectTime,DeliveryDay} = req.body;
    await User.findByIdAndUpdate({_id:req.userData[0]._id},{$push:{orderinfo:{PickDate,SelectTime,DeliveryDay}}})
    res.status(202).send({ message: "Cart inserted done" });
  } catch (error) {
    console.log(error);
    res.status(402).send({ message: "something went wrong" });
  }
})

module.exports = router;