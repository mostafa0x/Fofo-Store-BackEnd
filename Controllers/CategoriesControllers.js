const Categories = require("../Models/Models").DbCategories;

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await Categories.find({});
      return res.status(200).json({ message: "All categories", categories });
    } catch (err) {
      return res.status(500).json({ message: `Error ${err}` });
    }
  },
};
