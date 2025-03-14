const CartRouter = require("express").Router();
const CartControllers = require("../Controllers/CartControllers");
const Checkdb = require("../Middlewares/CheckDB");
const CheckToken = require("../Middlewares/CheckToken");

CartRouter.get("/Cart", Checkdb, CheckToken, CartControllers.index);

module.exports = CartRouter;
