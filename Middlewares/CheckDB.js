const Mongoose = require("mongoose");

function CheckDB(req, res, next) {
  if (Mongoose.connection.readyState === (0 || 4)) {
    return res.status(500).json({ message: "Database not Coneected !" });
  }
  next();
}

module.exports = CheckDB;
