const express = require("express");
const Cart = require("../dbConnectioin/Cart");
const User = require("../dbConnectioin/User");
const { virifiToken } = require("../module/jwt");
const router = express.Router();

router.post("/cart",virifiToken,async (req,res)=>{
  try {
    (req.body).map(async (item)=>{
    let userinfo = await User.findById({_id:req.userData[0]._id}).populate('cart')
    let prodel = false;
    for (const iterator of userinfo.cart) {
      if (JSON.stringify(iterator.products) == JSON.stringify(item._id)) {
        prodel = {_id:iterator._id,products:iterator.products}
      }
    }
    if (!!prodel) {
      await Cart.findByIdAndUpdate({_id:prodel._id},{quantity:item.quantity});
    }else{
      let { quantity, price, image, name } = item;
      const getresponce = new Cart({quantity, price, image, name});
      await User.findByIdAndUpdate({_id:req.userData[0]._id},{$push:{cart:getresponce._id}})
      await getresponce.save();
      await Cart.findByIdAndUpdate({_id:getresponce._id},{$push:{products:item._id}})
    }
  })
    res.send("Cart inserted done");
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong" });
  }
}) 

router.get("/CartInfo",virifiToken, async (req, res) => {
  try {
    const getresponce = req.userData[0]
    getresponce.email = '';
    getresponce.password = '';
    getresponce.verified = '';
    res.status(200).send(getresponce);
  } catch (error) {
    res.status(201).send({ message: "something went wrong" });
  }
});
module.exports = router;