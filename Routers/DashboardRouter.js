const DashBoardRouter = require("express").Router();
const Checkdb = require("../Middlewares/CheckDB");
const CheckToken = require("../Middlewares/CheckToken");
const DashBoardControlers = require("../Controllers/DashboardControllers");

DashBoardRouter.post("/", Checkdb, DashBoardControlers.index);

module.exports = DashBoardRouter;
