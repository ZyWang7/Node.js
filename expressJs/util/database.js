// using MySQL2 -----------------------------------------------------
// const mysql = require('mysql2');

// set up one connection and 
// should always close the connection once done with the query

/*
create connection pool
can run multiple queries simultaneously
once the query is done, the connection will be handed back into the pool
and available for a new query and the pool can then be finished whrn app shuts down
*/

/*
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node',
    password: 'W@qxx0102Hh-'
});

module.exports = pool.promise();
------------------------------------------------------------------ */

/*
// connect sequelize to the database --------------------------------
// -> use MySQL2 behind the scenes
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'W@mysql0102', {   
                                    dialect: 'mysql',
                                    host: 'localhost'
                                });
// -> will set up a connection pool

module.exports = sequelize;
------------------------------------------------------------------ */


// connect to mondodb -----------------------------------------------
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    // create a connection to mongodb
    MongoClient.connect('mongodb+srv://Victor:Wang%40mongodb7777@atlascluster.ikrzmow.mongodb.net/shop?retryWrites=true&w=majority')
    
        .then(client => {
            console.log('Connected to mongodb');
            _db = client.db('shop');        // connect to shop database
                                            // if not exist -> mongodb will create
            callback();
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
