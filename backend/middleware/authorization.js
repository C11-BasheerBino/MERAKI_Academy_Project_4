const authorization = (userPermission) => {
  return (req, res, next) => {
    console.log("hello", req.token.role.permissions);
    console.log(req.token.role.permissions.includes(userPermission));
    if (req.token.role.permissions.includes(userPermission)) {
      next();
    } else {
      const keys = {
        success: false,
        massage: "Unauthorized",
      };
      res.status(403).json(keys);
    }
  };
};

module.exports = authorization;
