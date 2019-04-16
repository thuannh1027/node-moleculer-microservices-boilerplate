const importer = require('../../utils/importer')
importer.importRoutes();

var routes = [];
for (const route of importer.routes) {
    if (route && Array.isArray(route)) {
        routes = [
            ...routes,
            ...(route)
        ]
    }
}

module.exports = routes