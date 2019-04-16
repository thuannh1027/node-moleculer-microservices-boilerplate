

const Sequelize = require("sequelize")
const SqlAdapter = require("moleculer-db-adapter-sequelize")
const { DbConfig } = require("../config")
// const dbMixin = require("../mixins/db.mixin")

const sqlAdapter = () => {
    const { database, username, password, host, poolOptions } = DbConfig
    return new SqlAdapter(database, username, password, {
        host: host,
        dialect: 'postgres',

        pool: {
            ...poolOptions
        }
    })
};

const sequelizeAdapter = () => {
    const { database, username, password, host, poolOptions } = DbConfig
    return new Sequelize(database, username, password, {
        host: host,
        dialect: 'postgres',

        pool: {
            ...poolOptions
        }
    });
}

const knexAdapter = () => {
    const { database, username, password, host, poolOptions } = DbConfig
    const knex = require('knex')({
        client: 'pg',
        connection: {
            host,
            user: username,
            password,
            database
        },
        pool: {
            ...poolOptions
        }
    });

    return knex
}

// const registerModel = (tableName, model) => {
//     return {
//         name: `db_${tableName}`,
//         mixins: [dbMixin],
//         model
//     }
// }

module.exports = {
    sqlAdapter,
    sequelizeAdapter,
    // registerModel,
    knexAdapter
}