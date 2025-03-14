const Cart = require("../Models/Models").DbCarts;
const MyCartV = [
  { name: "i1", coin: 5 },
  { name: "i2", coin: 5 },
];

module.exports = {
  index: async (req, res) => {
    const userId = String(req.users.sub);
    Total = 0;
    MyCartV.map((item) => {
      Total += item.coin;
    });

    try {
      const mycart = await Cart.findOne({ userId: userId });
      if (!mycart) {
        return res.status(200).json({
          message: "Empty Cart",
          Cart: { MyCart: MyCartV, Total },
        });
      }

      return res.status(200).json({ message: "done" + req.users.sub });
    } catch (err) {
      return res.status(400).json({ message: "Error  " + err });
    }
  },
};
