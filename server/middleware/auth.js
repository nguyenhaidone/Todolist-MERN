const jwt = require("jsonwebtoken");
const restRespone = require("../common/response");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json(restRespone(false,"Access token not found"));
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json(restRespone(false,"Invalid token"));
  }
};

module.exports = verifyToken;
