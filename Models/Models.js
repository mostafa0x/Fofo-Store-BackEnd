const mongoose = require("mongoose");
require("dotenv").config();

const mongooesURL = process.env.MongooseURL;

const SchemaUser = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
});

const SchemaCart = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
});

const DbUsers = mongoose.model("users", SchemaUser);
const DbCarts = mongoose.model("Carts", SchemaCart);

mongoose
  .connect(mongooesURL)
  .then(() => {
    console.log("Database -Ok");
  })
  .catch((err) => {
    console.log("Erro " + err);
  });

module.exports = { DbUsers, DbCarts };
