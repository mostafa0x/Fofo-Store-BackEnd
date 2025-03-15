const { log } = require("console");

const Cart = require("../Models/Models").DbCarts;
const Products = require("../Models/Models").DbProducts;

async function TotalPriceItems(CartItems) {
  const VirtualCart = CartItems;
  let Total = 0;

  VirtualCart.map((item) => {
    Total += parseInt(item.price);
  });
  return parseInt(Total);
}

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
  AddToCart: async (req, res) => {
    const userId = req.users.sub;
    const productID = req.body.productID;

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

      cartItems.push(product);
      const TotalPrice = await TotalPriceItems(cartItems);

      const updateResult = await Cart.updateOne(
        { id: userId },
        { Cart: { MyCart: cartItems, Totalprice: totalPrice } }
      );

      if (updateResult.matchedCount === 0) {
        await Cart.insertOne({
          id: userId,
          Cart: { MyCart: cartItems, Totalprice: totalPrice },
        });

        return res.status(201).json({
          message: "New cart created.",
          Cart: { MyCart: cartItems, TotalPrice },
        });
      }

      return res.status(200).json({
        message: "Product added to cart.",
        Cart: { MyCart: cartItems, TotalPrice },
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error occurred: ${err.message}` });
    }
  },
};
