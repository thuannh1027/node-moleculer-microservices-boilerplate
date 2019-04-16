module.exports.buildServiceAction = (handler, params = {}, ignoreAuth = false) => {
    return {
        ignoreAuth,
        params,
        handler: function (ctx) { return handler(ctx, this); }
    };
};