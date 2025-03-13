const appRouter = require("express").Router();
const Appontrollers = require("../Controllers/AppControllers");
const Checkdb = require("../Middlewares/CheckDB");
const CheckToken = require("../Middlewares/CheckToken");

appRouter.get("/", Checkdb, Appontrollers.index);

appRouter.get("/Cart", Checkdb, CheckToken, Appontrollers.MyCart);

module.exports = appRouter;
