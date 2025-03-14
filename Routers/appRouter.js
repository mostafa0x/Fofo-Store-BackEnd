const appRouter = require("express").Router();
const Appontrollers = require("../Controllers/AppControllers");
const Checkdb = require("../Middlewares/CheckDB");
const CheckToken = require("../Middlewares/CheckToken");

appRouter.get("/hi", Checkdb, Appontrollers.index);

module.exports = appRouter;
