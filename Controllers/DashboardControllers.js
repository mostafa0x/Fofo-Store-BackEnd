const Multer = require("multer");
const axios = require("axios");
const formdata = require("FormData");
require("dotenv").config();

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

module.exports = {
  AddProduct: async (req, res) => {
    const { title, description, price, category } = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({ message: "file not found" });
      }
      const form = new FormData();
      form.append("image", req.file.buffer);
      const ResIMGUR = await axios.post("https://api.imgur.com/3/image", form, {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
          ...form.getHeaders(),
        },
      });
      console.log(ResIMGUR);

      return res.status(200).json({ message: "Done Dash" });
    } catch (err) {
      return res.status(500).json({ message: `Error ${err}` });
    }
  },
};
