const jwt = require("jsonwebtoken");
const User = require("../dbConnectioin/User");

const createToken = (userId)=>{
    try {
        return token = jwt.sign(userId,process.env.SECRATE_KEY || 'praveenkimaruhjnvkoejsdu9h')
    } catch (error) {
        console.log(error);
    }
}

const virifiToken = async (req, res, next) => {
    try {
      if (req.headers.seingtoken) {
        const token = req.headers.seingtoken;
        const tr = jwt.verify(token, process.env.SECRATE_KEY || 'praveenkimaruhjnvkoejsdu9h');
        const user = await User.find({_id:tr}).populate('cart')
        // const user = await knex("user").where({ user_id: tr });
        req.userData = user;
        next();
      } else {
        res.send("token has expaire");
      }
    } catch (error) {
      console.log(error);
      res.send("token has expaire");
    }
  };
  
  module.exports = { createToken, virifiToken };