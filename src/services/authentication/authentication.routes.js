const { AUTHENTICATION_SERVICE } = require("../../constants/service-names")
const _serviceName = AUTHENTICATION_SERVICE

module.exports = [
    {
        path: "/authentication",
        whitelist: [
            `${_serviceName}.*`,
            "$node.*"
        ],
        authorization: true,
        aliases: {
            "POST create": `${_serviceName}.create`,
            "GET queryAccountRaw": `${_serviceName}.queryAccountRaw`,
            "GET queryAccounts": `${_serviceName}.queryAccounts`,
            "GET health": "$node.health",
        },
        bodyParsers: {
            json: true,
            urlencoded: { extended: true }
        },
        mergeParams: true
    }
]