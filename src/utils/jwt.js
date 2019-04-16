const { JwtConfig } = require("../config")
const jwt = require("jsonwebtoken")

const signToken = (username, scope) => {
    return jwt.sign(
        {
            username,
            scope
        },
        JwtConfig.secretKey,
        {
            algorithm: "HS256",
            expiresIn: JwtConfig.expires
        });
}

const verifyToken = (token) => {
    const result = {
        isValid: false
    }

    try {
        const decoded = jwt.verify(token, JwtConfig.secretKey);
        result.isValid = true;
        result.decoded = decoded;
    } catch (err) {
        result.error = err
    }

    return result
}

module.exports = {
    signToken,
    verifyToken
}