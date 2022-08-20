const mysql = require('mysql2');

// set up one connection and 
// should always close the connection once done with the query

/*
create connection pool
can run multiple queries simultaneously
once the query is done, the connection will be handed back into the pool
and available for a new query and the pool can then be finished whrn app shuts down
*/
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node',
    password: 'W@qxx0102Hh-'
});

module.exports = pool.promise();
