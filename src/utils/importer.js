const path = require("path")
const fs = require("fs")

const readFiles = (startPath, filter, callback) => {
    if (!fs.existsSync(startPath)) {
        return;
    }

    // eslint-disable-next-line
    const files = fs.readdirSync(startPath).forEach((file) => {
        // eslint-disable-next-line
        if (file === path.basename(__filename)) return;

        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            readFiles(filename, filter, callback);
        } else if (filter.test(filename)) {
            callback(filename);
        }
    });
};

module.exports.routes = [];
module.exports.models = [];

module.exports.importRoutes = () => {
    readFiles(path.dirname(require.main.filename), /\.routes.js$/, (file) => {
        const temp = require(path.join("", file));
        module.exports.routes.push(temp);
    });
};

module.exports.importModels = () => {    
    readFiles(path.dirname(require.main.filename), /\.model.js$/, (file) => {
        const temp = require(path.join("", file));
        module.exports.models.push(temp);
    });
}