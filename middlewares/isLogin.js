const { AppErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  // Get token from req header
  const token = getTokenFromHeader(req);
  // Verify token
  const decodedUser = verifyToken(token);
  // Save the user in the req obj
  req.user = decodedUser.id;
  if (decodedUser === false) {
    return next(new AppErr('Invalid/Expired Token please login again', 404));
  }
  next();
};

module.exports = isLogin;
