require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const Client = new OAuth2Client(process.env.ClientID || "");

async function CheckToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const ticket = await Client.verifyIdToken({
      idToken: token,
      audience: process.env.ClientID,
    });
    req.users = ticket.getPayload();
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = CheckToken;
