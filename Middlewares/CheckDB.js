const Mongoose = require("mongoose");

function CheckDB(req, res, next) {
  if (Mongoose.ConnectionStates.connected) {
    next();
  } else {
    return res.status(500).json({ message: "Database not Coneected !" });
  }
}

module.exports = CheckDB;
