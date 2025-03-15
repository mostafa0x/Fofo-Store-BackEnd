const { log } = require("console");

const Cart = require("../Models/Models").DbCarts;
const Products = require("../Models/Models").DbProducts;

async function TotalPriceItems(Data) {
  const VcartV = Data;
  let Total = 0;

  VcartV.map((item) => {
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
    const ProdcutID = req.body.productID;

    if (!ProdcutID) {
      return res.status(400).json({ message: "Error to Found ProductID" });
    }
    try {
      const Product = await Products.findOne({ id: ProdcutID });
      if (!Product) {
        return res
          .status(404)
          .json({ messsage: "There is no product with this ID." });
      }

      const FindCart = await Cart.findOne({ id: userId });
      if (!FindCart) {
        var ObjCart = [];
      } else {
        var ObjCart = FindCart.Cart.MyCart;
      }

      ObjCart.push(Product);
      const Totalprice = await TotalPriceItems(ObjCart);

      const Add = await Cart.updateOne(
        { id: userId },
        { Cart: { MyCart: ObjCart, Totalprice } }
      );

      if (Add.matchedCount === 0) {
        const newOne = await Cart.insertOne({
          id: userId,
          Cart: { MyCart: ObjCart, Totalprice },
        });

        return res.status(201).json({
          message: "New Cart",
          Cart: { MyCart: ObjCart, Totalprice },
        });
      }

      return res.status(200).json({
        message: "Add To Cart",
        Cart: { MyCart: ObjCart, Totalprice: Totalprice },
      });
    } catch (err) {
      res.status(400).json({ message: "Error  " + err });
    }
  },
};
