const debug = require("debug")("serviceAuth:");
const UserService = require("./userService");
const JWT = require("../middlewares/jwt");

const login = async (email, password) => {
  let user = await UserService.findByEmail(email);
  if (user && user.status_active) {
    let isMatch = user.comparePassword(password);
    if (isMatch) {
      return (payload = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.roles,
        _id: user._id,
        status_active: user.status_active
      });
    } else return null;
  } else return null;
};

const loginAPI = async (email, password) => {
  let user = await UserService.findByEmail(email);
  if (user && user.status_active && user.comparePassword(password)) {
    let payload = {
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.roles,
      status_active: user.status_active
    };
    let token = JWT.createToken(payload);
    return { ...payload, token: token };
  } else return null;
};

const isConnected = async req => {
  return !!req.session.user;
};

const logout = async req => {
  await req.session.destroy();
};

module.exports = {
  login: login,
  isConnected: isConnected,
  logout: logout,
  loginAPI: loginAPI
};
