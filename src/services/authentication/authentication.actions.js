const { RESPONSE_ERROR_MESSAGE } = require("../../constants/messages")

const createHandler = async (ctx, srv) => {
    try {
        await srv.dbAccounts.insert(ctx, {
            username: ctx.params.username,
            password: ctx.params.password,
            email: ctx.params.email,
        })

        return srv.ok("User Account Created", ctx.params.username)
    } catch (err) {
        if (err.name === "Database Error" && Array.isArray(err.data)) {
            if (err.data[0].type === "unique" && err.data[0].field === "username")
                return srv.internalServerError(RESPONSE_ERROR_MESSAGE.DUPLICATE_USERNAME);
        }

        return srv.internalServerError(err);
    }
};

const queryAccountRaw = async (ctx, srv) => {
    try {
        const result = await srv.db.raw(ctx, "SELECT * FROM public.accounts")

        return srv.ok(result)
    } catch (err) {
        if (err.name === "Database Error" && Array.isArray(err.data)) {
            if (err.data[0].type === "unique" && err.data[0].field === "username")
                return srv.internalServerError(RESPONSE_ERROR_MESSAGE.DUPLICATE_USERNAME);
        }

        return srv.internalServerError(err);
    }
}

const queryAccounts = async (ctx, srv) => {
    try {
        const result = await srv.db.find(ctx)

        return srv.ok(result)
    } catch (err) {
        if (err.name === "Database Error" && Array.isArray(err.data)) {
            if (err.data[0].type === "unique" && err.data[0].field === "username")
                return srv.internalServerError(RESPONSE_ERROR_MESSAGE.DUPLICATE_USERNAME);
        }

        return srv.internalServerError(err);
    }
}

module.exports = {
    createHandler,
    queryAccountRaw,
    queryAccounts
}