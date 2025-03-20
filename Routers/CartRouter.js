const CartRouter = require("express").Router();
const CartControllers = require("../Controllers/CartControllers");


CartRouter.get("/Cart", Checkdb, CheckToken, CartControllers.index);

CartRouter.post("/Cart", Checkdb, CheckToken, CartControllers.addProductToCart);

CartRouter.patch("/Cart", Checkdb, CheckToken, CartControllers.UpdateCount);

CartRouter.delete(
  "/Cart/:id",
  Checkdb,
  CheckToken,
  CartControllers.RemoveProductFromCart
);

CartRouter.delete("/AllCart", Checkdb, CheckToken, CartControllers.DeleteCart);

module.exports = CartRouter;
