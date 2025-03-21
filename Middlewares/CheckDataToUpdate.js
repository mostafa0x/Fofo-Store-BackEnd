async function CheckDataToPost(req, res, next) {
  const { title, description, price, category, DisPercentage, stock, _id } =
    req.body;

  try {
    if (
      !_id ||
      !title ||
      !description ||
      !price ||
      !category ||
      !DisPercentage ||
      !stock
    ) {
      return res.status(400).json({ message: "Bad Requst " });
    }

    if (title.length < 4) {
      return res.status(400).json({
        message: "The Title must be greater than or equal to 4 letters",
      });
    }

    if (description.length < 8) {
      return res.status(400).json({
        message: "The description must be greater than or equal to 8 letters",
      });
    }

    if (Math.ceil(price || DisPercentage || stock) < 0) {
      return res.status(400).json({
        message:
          "The price & DisPercentage & stock  must not be less than zero.",
      });
    }
    if (DisPercentage > 100) {
      return res.status(400).json({
        message: "The DisPercentage  must not be than than 100.",
      });
    }
    if (Object.keys(category).length === 0) {
      return res.status(400).json({
        message: "Category error",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: `Error ${err}` });
  }
}

module.exports = CheckDataToPost;
