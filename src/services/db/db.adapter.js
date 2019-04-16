const { pick } = require("lodash")
const Promise = require("bluebird")
const { DB_SERVICE } = require("../../constants/service-names")

class DBAdapter {
    // create an instance of Database for a given table
    constructor(tableName) {
        this._tableName = tableName
        this._dbService = DB_SERVICE
    }

    // format an Error Message from Sequelize (database) Error
    knexErrorHandler(err, resDefault = {}) {
        let name = resDefault.name || "Unknown Error"
        let message = resDefault.message || ""

        if (err) {
            name = "Database Error"
            message = err.Error || message
        }

        return {
            name,
            message
        }
    }

    knexRawSuccessHandler(res) {
        if (!res) return null
        if (!res.rows) return null

        return res.rows
    }

    /**
     * Find
     * @param {*} ctx 
     * @param {*} search 
     */
    find(ctx, query = {}) {
        if (!this._tableName) throw new Error("Missing table name")

        return ctx
            .call(`${this._dbService}.find`, {
                table: this._tableName,
                query
            })
            .then((res) => {
                if (!res)
                    return Promise.reject({
                        name: "Unknown Error",
                        message: "Internal Error: something went wrong while executing the raw query"
                    });

                return Promise.resolve({
                    name: "Operation Successful",
                    message: `Query Completed: ${res.length} record(s) found`,
                    data: res
                });
            })
            .catch((err) => {
                console.log(err)
                return Promise.reject(this.knexErrorHandler(err, {
                    name: "Unknown Error",
                    message: "Internal Error: something went wrong while executing the finding query"
                }))
            });
    }

    /**
     * Run a raw query
     */
    raw(ctx, query) {
        return ctx
            .call(`${this._dbService}.raw`, { query })
            .then((res) => {
                const data = this.knexRawSuccessHandler(res)

                if (!data)
                    return Promise.reject({
                        name: "Unknown Error",
                        message: "Internal Error: something went wrong while executing the raw query"
                    });

                return Promise.resolve({
                    name: "Operation Successful",
                    message: `Query Completed: ${data.length} record(s) found`,
                    data
                });
            })
            .catch((err) => {
                if (err.name && err.message && !err.type && !err.code && !err.ctx)
                    return Promise.reject(err);
                else
                    return Promise.reject({
                        name: "Unknown Error",
                        message: "Internal Error: something went wrong while executing the raw query"
                    });
            });
    }
}

module.exports = DBAdapter