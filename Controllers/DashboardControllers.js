const axios = require("axios");
const formdata = require("form-data");
const Products = require("../Models/Models").DbProducts;
require("dotenv").config();

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

module.exports = {
  PostProdcut: async (req, res) => {
    const { title, description, price, category, DisPercentage, stock } =
      req.body;
    const imageUrls = req.images;

    try {
      const NEWcategory = JSON.parse(category);

      const MaxID = await Products.aggregate([
        {
          $group: { _id: null, id: { $max: "$id" } },
        },
      ]);
      const newId = MaxID[0] ? MaxID[0].id + 1 : 1;

      const PriceAfterDisxx = Math.ceil(price - price * (DisPercentage / 100));

      const NewProduct = new Products({
        id: newId,
        title,
        description,
        price,
        priceAfterDis: PriceAfterDisxx,
        category: {
          name: NEWcategory.name,
          id: NEWcategory.id,
          image: NEWcategory.image,
        },
        DisPercentage,
        stock,
        images: imageUrls,
      });
      await NewProduct.save();

      return res.status(200).json({
        message: "Product added successfully",
        product: NewProduct,
      });
    } catch (err) {
      return res.status(500).json({ message: `Error ${err}` });
    }
  },
};
