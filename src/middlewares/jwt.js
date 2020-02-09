const jwt = require("jsonwebtoken");
const debug = require("debug")("middlewareJWT");
const UserService = require("../services/userService");

const signOptions = {
    issuer: "LET-OSS-SAVE-THE-WORLD-BE",
    subject: "michaeuwybraniec@gmail.com",
    audience: "universe",
    expiresIn: "48h",
    algorithm: "HS256"
};

const encryptionKey = "=e2hté322Lt93'rlkjk$2]Y%`hhX:ZAW>u_Whftywj6";

const verify = async (req, res, next) => {

    const token = req.headers.authorization
        ? req.headers.authorization.split(" ").pop()
        : null;

    const allUsers = await UserService.findAll();

    jwt.verify(token, encryptionKey, signOptions, function (err, decoded) {
        if (err) {
            debug(err, "Token given");
            res.status(403).json({
                success: false,
                message: err
            });
        } else {

            for (let user of allUsers) {
                if (user._id.toString() === decoded._id) {
                    req.userId = decoded._id;
                    next();
                } else {
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            }
        }
    });
};

const createToken = payload => {
    return jwt.sign(payload, encryptionKey, signOptions);
};

module.exports = {
    verify: verify,
    createToken: createToken
};
