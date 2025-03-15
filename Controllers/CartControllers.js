const Cart = require("../Models/Models").DbCarts;
const Products = require("../Models/Models").DbProducts;
const TotalPriceItems = require("../Functions/TotalPriceCart");
const TotalPrice = require("../Functions/TotalPriceCart");

module.exports = {
  index: async (req, res) => {
    const userId = req.users.sub;
    Totalprice = 0;
    // await TotalPriceItems();

    try {
      const mycart = await Cart.findOne({ id: userId });
      if (!mycart) {
        return res.status(200).json({
          message: "New Cart",
          Cart: { MyCart: [], Totalprice },
        });
      }
      const insideCart = mycart.Cart;
      return res.status(200).json({
        message: "Found Cart",
        Cart: insideCart,
      });
    } catch (err) {
      return res.status(400).json({ message: "Error  " + err });
    }
  },
  addProductToCart: async (req, res) => {
    const userId = req.users.sub;
    const productID = req.body.productID;
    let productFoundInCart = false;

    if (!productID || typeof productID !== "number") {
      return res.status(400).json({ message: "ProductID is required." });
    }

    try {
      const product = await Products.findOne({ id: productID });
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      let cart = await Cart.findOne({ id: userId });
      let cartItems = cart ? cart.Cart.MyCart : [];

      cartItems.forEach((itemCart) => {
        if (itemCart.id === productID) {
          itemCart.count += 1;
          productFoundInCart = true;
        }
      });

      if (!productFoundInCart) {
        product.count = 1;
        cartItems.push(product);
      }

      let totalPrice = await TotalPrice(cartItems);
      if (isNaN(totalPrice)) {
        totalPrice = 0;
      }

      const updateResult = await Cart.findOneAndUpdate(
        { id: userId },
        {
          Cart: {
            MyCart: cartItems,
            Totalprice: totalPrice,
          },
        },
        { upsert: true, new: true }
      );

      return res.status(updateResult ? 200 : 201).json({
        message: productFoundInCart
          ? "Product quantity updated."
          : "Product added to cart.",
        Cart: {
          MyCart: cartItems,
          Totalprice: totalPrice,
        },
      });
    } catch (err) {
      return res.status(500).json({ message: `Error: ${err.message}` });
    }
  },
  RemoveProductFromCart: async (req, res) => {
    const userId = req.users.sub;
    const ProductIDonCart = req.body.productID;

    try {
      const ProductWillDelete = await Cart.updateOne(
        { id: userId, "Cart.MyCart.id": ProductIDonCart },
        { $pull: { "Cart.MyCart": { id: ProductIDonCart } } }
      );

      if (ProductWillDelete.modifiedCount === 0) {
        return res.status(400).json({ message: "Not Found Product in Cart" });
      }
      let Data = await Cart.findOne({ id: userId });
      const Total = await TotalPrice(Data.Cart.MyCart);
      const update = await Cart.updateOne(
        { id: userId },
        {
          $set: {
            "Cart.Totalprice": Total,
          },
        }
      );
      Data = await Cart.findOne({ id: userId });
      return res
        .status(200)
        .json({ message: "Product Deleted from Cart", Cart: Data.Cart });
    } catch (err) {
      res.status(500).json({ message: `Error ${err}` });
    }
  },
  UpdateCount: async (req, res) => {
    const userId = req.users.sub;
    const { productID } = req.body;

    if (!productID) {
      return res.status(400).json({ message: "productID is required" });
    }

    try {
      const cart = await Cart.findOne({ id: userId });
      const SelectProduct = cart.Cart.MyCart.find(
        (item) => item.id == productID
      );
      if (!SelectProduct) {
        return res.status(400).json({ message: "Product Not Found in Cart" });
      }

      const updateCount = await Cart.findOneAndUpdate(
        {
          id: userId,
          "Cart.MyCart.id": productID,
        },
        {
          $inc: {
            "Cart.MyCart.$.count": -1,
            "Cart.Totalprice": -parseInt(SelectProduct.price),
          },
        },
        { new: true }
      );
      if (!updateCount) {
        return res.status(400).json({ message: "Product Not Found in Cart" });
      }

      const Product = updateCount.Cart.MyCart.find(
        (product) => product.id == productID
      );

      if (Product.count <= 0) {
        var FinalData = await Cart.findOneAndUpdate(
          { id: userId },
          {
            $pull: { "Cart.MyCart": { id: productID } },
          },
          { new: true }
        );
        return res.status(200).json({
          message: "The product has been deleted",
          Cart: FinalData.Cart,
        });
      }

      res.status(200).json({
        message: "The product quantity has been modified.",
        Cart: FinalData.Cart,
      });
    } catch (err) {
      res.status(500).json({ message: `Error  ${err}` });
    }
  },
};
