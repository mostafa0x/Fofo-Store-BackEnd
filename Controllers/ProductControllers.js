const Products = require("../Models/Models").DbProducts;

module.exports = {
  index: async (req, res) => {
    try {
      const products = await Products.find({});

      if (!products) {
        return res.status(404).json({ message: "Error Products" });
      }

      return res
        .status(200)
        .json({ message: "Done Products", Product: products });
    } catch (err) {
      return res.status(400).json({ message: "Error  " + err });
    }
  },
};
