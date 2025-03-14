module.exports = {
  index: async (req, res) => {
    return res.status(200).json({ message: "hi" });
  },
};
