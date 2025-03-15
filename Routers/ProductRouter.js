const ProductRouter = require("express").Router();
const Checkdb = require("../Middlewares/CheckDB");
const CheckToken = require("../Middlewares/CheckToken");
const ProductControlles = require("../Controllers/ProductControllers");

ProductRouter.get("/Products", Checkdb, ProductControlles.index);

ProductRouter.get("/Product/:id", Checkdb, ProductControlles.GetByID);

module.exports = ProductRouter;
