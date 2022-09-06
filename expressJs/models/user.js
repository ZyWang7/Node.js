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
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;

        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            // increase the orginal one
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            // add a product
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = { items: updatedCartItems };

        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: {cart: updatedCart} }       // only overwrite cart
        );
    }

    getCart() {
        const db = getDb();
        // get the array of ids
        const produstIds = this.cart.items.map(i => {
            return i.productId;
        });

        // get the product info using the reference id
        return db.collection('products').find({
                    _id: { $in: produstIds }      // take an array of ids
                }).toArray()
                .then(products => {         // get the array of products
                    return products.map(p => {
                        return {
                            ...p,
                            // get the right quantity
                            quantity: this.cart.items.find(i => {
                                return i.productId.toString() === p._id.toString();
                            }).quantity     // extract the quantity for the product
                        };
                    });
                })
                .catch(err => console.log(err));
        
        // should return the products
        // -> enriched with all the data that is stored in the products collection

    }

    deleteItemFromCart(productId) {
        const db = getDb();
        const updatedCartItems = this.cart.items.filter(i => {
            return i.productId.toString() !== productId.toString();
        });

        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: {cart: {items: updatedCartItems}} }
        );

    }

    addOrder() {
        const db = getDb();
        return this.getCart().then( products => {     // get an array of products
            const order = {
                items: products,
                user: {
                    _id: new ObjectId(this._id),
                    name: this.name
                }
            };
            // insert to 'orders' collection
            return db.collection('orders').insertOne(order);
        })
        .then(result => {
            this.cart = { items: [] };      // empty the cart
            // clear in the database
            return db.collection('users').updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: {items: []} } }
            );
        });
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({
            'user._id': new ObjectId(this._id)
        }).toArray();   // get the order for the user
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;
