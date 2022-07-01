const pg = require('pg');

const Pool = pg.Pool;

// create a new pool instance to manage connections
const pool = new Pool({
    database: 'weekend-to-do-app', 
    host: 'localhost',
    port: 5432, // 5432 is default for Postgres
    max: 20, // how many connections (queries) at one time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect, otherwise query is cancelled
});

// not required but useful for troubleshooting
pool.on('connect', () => {
    console.log('PostgreSQL is connected');
});
pool.on('error', (error) => {
    console.log('error with pg pool', error);
});

// allow access to this pool from other code
module.exports = pool;