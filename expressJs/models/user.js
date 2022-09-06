/*
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});
*/


// using MongoDB
const getDb = require('../util/database').getDb;

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;
