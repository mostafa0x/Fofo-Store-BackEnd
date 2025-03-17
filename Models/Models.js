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
  id: {
    type: Number,
    required: true,
  },
  Cart: {
    MyCart: { type: Array, required: true },
    Totalprice: {
      type: Number,
      required: true,
    },
  },
});

const SchemaProducts = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  images: {
    type: Array,
    required: true,
  },
  count: { type: Number, requird: true },
});

const SchemaCategorie = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
});

const DbUsers = mongoose.model("users", SchemaUser);
const DbCarts = mongoose.model("carts", SchemaCart);
const DbProducts = mongoose.model("products", SchemaProducts);
const DbCategories = mongoose.model("categories", SchemaCategorie);

mongoose
  .connect(mongooesURL)
  .then(() => {
    console.log("Database -Ok");
  })
  .catch((err) => {
    console.log("Erro " + err);
  });

module.exports = { DbUsers, DbCarts, DbProducts, DbCategories };
