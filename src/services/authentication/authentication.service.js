const BaseService = require("../../mixins/base.mixin")
const { AUTHENTICATION_SERVICE } = require("../../constants/service-names")
const { TABLE_ACCOUNT } = require("../../constants/db-names")
const { createHandler, queryAccountRaw, queryAccounts } = require("./authentication.actions")
const Database = require("../db/db.adapter")
const CacheCleanerMixin = require("../../mixins/cache.cleaner.mixin")
const { buildServiceAction } = require("../../utils/common")

module.exports = {
    name: AUTHENTICATION_SERVICE,
    mixins: [BaseService,
        CacheCleanerMixin([
            "cache.clean.authentication"
        ])],
    actions: {
        create: buildServiceAction(createHandler, {
            username: "string",
            password: "string",
            email: "string"
        }, true),
        queryAccountRaw: buildServiceAction(queryAccountRaw, {}, true),
        queryAccounts: buildServiceAction(queryAccounts, {}, true)
    },

    created() {
        this.db = new Database(TABLE_ACCOUNT);
    }
};