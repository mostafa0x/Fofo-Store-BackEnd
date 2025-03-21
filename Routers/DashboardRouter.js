const DashBoardRouter = require("express").Router();
const Checkdb = require("../Middlewares/CheckDB");
const CheckToken = require("../Middlewares/CheckToken");
const DashBoardControlers = require("../Controllers/DashboardControllers");
const Multer = require("multer");

const storage = Multer.memoryStorage();
const upload = Multer({ storage: storage });

DashBoardRouter.post(
  "/admin/product",
  upload.single("image"),
  Checkdb,
  DashBoardControlers.PostProdcut
);

module.exports = DashBoardRouter;
