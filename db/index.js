const { Pool } = require('pg')

const pool = new Pool({
    user: 'itek',
    host: '15.206.44.105',
    database: 'postgres',
    password: 'Password321$$',
    port: 5432,
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}
