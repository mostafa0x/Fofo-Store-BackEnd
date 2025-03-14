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
    const id = parseInt(req.params.id);

    if (typeof id !== "number" || isNaN(id)) {
      return res.status(400).json({ message: "The ID must be numbers." });
    }

    try {
      const ProductById = await DbProducts.findOne({ id: id });
      if (!ProductById) {
        return res
          .status(400)
          .json({ message: "There is no product with this ID." });
      }
      return res
        .status(200)
        .json({ message: "Found one", Product: ProductById });
    } catch (err) {
      return res.status(400).json({ message: "Error  " + err });
    }
  },
};
