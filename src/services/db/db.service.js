const { knexAdapter } = require("../../utils/database")
const { DB_SERVICE } = require("../../constants/service-names")

module.exports = {
    name: DB_SERVICE,
    actions: {
        raw(ctx) {
            return this.db.raw(ctx.params.query);
        },
        find(ctx) {
            if (!ctx.params.table)
                throw new Error("Missing table")

            return this.db(ctx.params.table).where(ctx.params.query || {}).select("*");
        },
        insert(ctx) {
            if (!ctx.params.table)
                throw new Error("Missing table")

            if (!ctx.params.record)
                throw new Error("Missing insert record")

            return this.db(ctx.params.table)
                .insert({ ...ctx.params.record })
        },
        insertMany(ctx) {
            if (!ctx.params.table)
                throw new Error("Missing table")

            if (!ctx.params.records)
                throw new Error("Missing insert records")

            return this.db(ctx.params.table)
                .insert([...ctx.params.records])
        },
        update(ctx) {
            if (!ctx.params.table)
                throw new Error("Missing table")

            if (!ctx.params.query)
                throw new Error("Must provide query")

            if (!ctx.params.record)
                throw new Error("Missing update record")

            return this.db(ctx.params.table)
                .where(ctx.params.query || {})
                .update({ ...ctx.params.record })
        },
        delete() {
            if (!ctx.params.table)
                throw new Error("Missing table")

            if (!ctx.params.query)
                throw new Error("Must provide query")

            return this.db(ctx.params.table)
                .where(ctx.params.query || {})
                .del()
        }
    },
    created() {
        this.db = knexAdapter();
    }
}