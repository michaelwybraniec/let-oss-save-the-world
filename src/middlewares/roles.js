const isUser = (req, res, next) => {
  checkRole("user", req, res, next);
};

const isAdmin = (req, res, next) => {
  checkRole("admin", req, res, next);
};

const checkRole = (role, req, res, next) => {
  if (!req.role || req.role !== role) res.status(403).json({ success: false, message: "Unauthorized" });
  else next();
};

module.exports = {
  isUser: isUser,
  isAdmin: isAdmin
};
