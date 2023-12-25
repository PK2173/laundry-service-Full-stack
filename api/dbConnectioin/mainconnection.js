const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODBCONNECTION
  )
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
