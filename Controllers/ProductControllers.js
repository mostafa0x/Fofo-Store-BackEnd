const { DbProducts } = require("../Models/Models");

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
        .json({ message: "Done Products", Products: products });
    } catch (err) {
      return res.status(400).json({ message: "Error  " + err });
    }
  },
  GetByID: async (req, res) => {
    const id = req.params.id;

    try {
      const ProductById = await DbProducts.findById({ _id: id });
      if (!ProductById) {
        res.status(400).json({ message: "Not Found Product " });
      }
      res.status(200).json({ message: "Found one", Product: ProductById });
    } catch (err) {
      res.status(400).json({ message: "Error  " + err });
    }
  },
};
