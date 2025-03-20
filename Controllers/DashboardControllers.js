module.exports = {
  index: async (req, res) => {
    try {
      return res.status(200).json({ message: "Done Dash" });
    } catch (err) {
      return res.status(500).json({ message: `Error ${err}` });
    }
  },
};
