const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;


const authentcation = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const payload = await jwt.verify(token, secret);
      req.token = payload;
      next();
    } catch (err) {
      const keys = {
        success: false,
        message: "The token is invalid or expired",
      };
      res.status(403).json(keys);
    }
  } else {
    const key = {
      success: false,
      message: "Forbidden",
    };
    res.status(403).json(key);
  }
};


module.exports=authentcation