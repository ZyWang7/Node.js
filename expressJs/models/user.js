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
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;       // {items: []}
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const db = getDb();
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // });

        // add a product
        const updatedCart = {items: [{ productId: new ObjectId(product._id), quantity: 1 }]};
        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: {cart: updatedCart} }       // only overwrite cart
        );
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;
