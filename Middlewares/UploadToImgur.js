const formdata = require("form-data");
const axios = require("axios");
require("dotenv").config();

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

async function UploadImges(req, res, next) {
  const files = req.files;
  const imageUrls = [];

  for (let file of files) {
    const form = new formdata();
    form.append("image", file.buffer);

    const headers = {
      Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      ...form.getHeaders(),
    };

    const ResIMGUR = await axios.post("https://api.imgur.com/3/image", form, {
      headers,
    });

    if (!ResIMGUR || !ResIMGUR.data || !ResIMGUR.data.data.link) {
      return res.status(500).json({ message: "Image upload failed" });
    }
    imageUrls.push(ResIMGUR.data.data.link);
  }
  req.images = imageUrls;
  next();
}

module.exports = UploadImges;
