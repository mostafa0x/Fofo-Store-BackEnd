const ProductRouter = require("express").Router();
const Checkdb = require("../Middlewares/CheckDB");
const CheckToken = require("../Middlewares/CheckToken");
const ProductControlles = require("../Controllers/ProductControllers");

ProductRouter.get("/", Checkdb, CheckToken, ProductControlles.index);

module.exports = ProductRouter;
