const CategoriesRouter = require("express").Router();
const CategoriesControllers = require("../Controllers/CategoriesControllers");
const CheckDB = require("../Middlewares/CheckDB");

CategoriesRouter.get("/Categories", CheckDB, CategoriesControllers.index);

module.exports = CategoriesRouter;
