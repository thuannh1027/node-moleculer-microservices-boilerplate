const nanoid = require("nanoid")

module.exports = {
    random: () => nanoid(),

    randomInSize: size => nanoid(size)
}