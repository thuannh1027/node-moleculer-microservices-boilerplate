module.exports = {
    namespace: "msig",

    logger: console,
    logLevel: "info",
    logFormatter: "default",
    logObjectPrinter: null,

    requestTimeout: 5 * 1000,
    retryPolicy: {
        enabled: true,
        retries: 5,
        delay: 100,
        maxDelay: 1000,
        factor: 2,
        check: err => err && !!err.retryable
    },
    
    transporter: "nats://localhost:4222",

    maxCallLevel: 100,
    heartbeatInterval: 5,
    heartbeatTimeout: 15,

    tracking: {
        enabled: true,
        shutdownTimeout: 5000,
    },

    disableBalancer: false,

    registry: {
        strategy: "RoundRobin",
        preferLocal: true
    },

    circuitBreaker: {
        enabled: true,
        threshold: 0.5,
        windowTime: 60,
        minRequestCount: 20,
        halfOpenTime: 10 * 1000,
        check: err => err && err.code >= 500
    },   

    bulkhead: {
        enabled: true,
        concurrency: 10,
        maxQueueSize: 100,
    },

    transit: {
        maxQueueSize: 50 * 1000,
        disableReconnect: false,
        packetLogFilter: []
    },     

    cacher: "memory",
    serializer: null,

    skipProcessEventRegistration: false,

    validation: true,
    validator: null,

    metrics: true,
    metricsRate: 1,

    internalServices: true,
    internalMiddlewares: true,

    hotReload: true,

    ServiceFactory: null,
    ContextFactory: null,
};