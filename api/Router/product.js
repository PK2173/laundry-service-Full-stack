const express = require("express");
const Product = require("../dbConnectioin/Product");
const { virifiToken } = require("../module/jwt");
const router = express.Router();

router.get("/",virifiToken, async (req, res) => {
  try {
    const getresponce = await Product.find({});
    res.status(200).send(getresponce);
  } catch (error) {
    res.status(201).send({ message: "something went wrong" });
  }
});

router.post("/", async (req, res) => {
    try {
      const getresponce = new Product(req.body);
      await getresponce.save();
      res.status(200).send({message:"insertion done"});
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "something went wrong" });
    }
  });

module.exports = router;
