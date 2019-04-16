const crypto = require("crypto");

const generateSalt = () => {
    const buf = crypto.randomBytes(16);
    return buf.toString("base64");
};

module.exports = {
    generateSalt
}