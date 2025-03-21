const axios = require("axios");
const formdata = require("form-data");
const Products = require("../Models/Models").DbProducts;
require("dotenv").config();

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

module.exports = {
  PostProdcut: async (req, res) => {
    const { title, description, price, category, DisPercentage, stock } =
      req.body;
    try {
      if (!req.file || !title) {
        return res.status(400).json({ message: "file not found" });
      }
      const NEWcategory = JSON.parse(category);

      const form = new formdata();
      form.append("image", req.file.buffer);

      const headers = {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        ...form.getHeaders(),
      };

      const ResIMGUR = await axios.post("https://api.imgur.com/3/image", form, {
        headers,
      });
      const imageUrl = ResIMGUR.data.data.link;

      const MaxID = await Products.aggregate([
        {
          $group: { _id: null, id: { $max: "$id" } },
        },
      ]);

      const NewProduct = new Products({
        id: MaxID[0].id + 1,
        title,
        description,
        price,
        category: {
          name: NEWcategory.name,
          id: NEWcategory.id,
          image: NEWcategory.image,
        },
        DisPercentage,
        stock,
        images: [imageUrl],
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
