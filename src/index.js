const { ServiceBroker } = require("moleculer");
const moleculerOptions = require("../moleculer.config")
const { random } = require("./utils/random")

const _startNode = async (name, services) => {
    const options = {
        ...moleculerOptions,
        nodeID: `node-${random()}`
    }
    const _broker = new ServiceBroker(options)

    for (let i = 0; i < services.length; i++) {
        _broker.loadService(`./src/services/${services[i]}/${services[i]}.service.js`)
    }

    await _broker.start()
}

const _initApp = async () => {
    // register the knex database service
    await _startNode("db", ["db"])    

    // auth services
    await _startNode("authentication", ["authentication"])

    // application services
    await _startNode("application", ["claimManagement", "customerManagement", "policyManagement", "random", "users"])

    // api gateway
    await _startNode("apiGateway", ["api"])
}

_initApp();
