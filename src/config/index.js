const db = require("./db.config")
const jwt = require("./jwt.config")
const env = require("./env.config")

module.exports = {
    DbConfig: db,
    JwtConfig: jwt,
    Env: env
};