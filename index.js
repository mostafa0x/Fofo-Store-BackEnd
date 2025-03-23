const Express = require("express");
const app = Express();
const Router = require("./Routers/Router.js");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { DbUsers } = require("./Models/Models.js");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "https://fofo-store.vercel.app",
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  "/",
  Router.appRouter,
  Router.CartRouter,
  Router.ProductRouter,
  Router.CategoriesRouter,
  Router.DashboardRouter
);

app.listen(PORT, () => {
  console.log(`Server Working on ${PORT}`);
});
