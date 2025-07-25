const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const white_list = ["/login", "/register"];
  if (white_list.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        next();
      } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "token expire//invalid" });
      }
    } else {
      return res.status(401).json({ message: "token expire//invalid" });
    }
  }
};

module.exports = auth;
