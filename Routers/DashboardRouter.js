const DashBoardRouter = require("express").Router();
const Checkdb = require("../Middlewares/CheckDB");
const CheckToken = require("../Middlewares/CheckToken");
const DashBoardControlers = require("../Controllers/DashboardControllers");
const Multer = require("multer");
const CheckDataToPost = require("../Middlewares/CheckDataToPost");
const UploadToImgur = require("../Middlewares/UploadToImgur");

const storage = Multer.memoryStorage();
const upload = Multer({ storage: storage });

DashBoardRouter.post(
  "/admin/product",
  Checkdb,
  upload.array("image", 5),
  CheckDataToPost,
  UploadToImgur,
  DashBoardControlers.PostProdcut
);

module.exports = DashBoardRouter;
