// get access to the pool
// const db = require('../util/database');

// const Cart = require('./cart');

/* get info from file -------------------------------------
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
                        'data',
                        'products.json');

// create a helper function
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            // return [];
            cb([]);
        } else {
            // return JSON.parse(fileContent);
            cb(JSON.parse(fileContent));
        }
    });
} 
-------------------------------------------------------- */

/*
module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
*/

    // store the product in the array
    /* get info from file -------------------------------------
    save() {
        getProductsFromFile(products => {
            if (this.id) {
                // if now looking at the product plan on editing
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                // create a new array and pull put all the products
                const updatedProduct = [...products];
                // replace the existing product with this
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                // this -> refer to the object created based on the class
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
            
        });

        
        // get the existing product -- read the file at path p
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                // convert json to JS array/object
                products = JSON.parse(fileContent);
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            // const productIndex = products.findIndex(p => p.id === id);
            // return all elements as part of a new array that do match the filter
            const updateProd = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updateProd), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    // retrieve all the products
    static fetchAll(cb) {
    // the thing calling fetchAll can pass a function is then aware of being
    // called which holds the data I want to return
        getProductsFromFile(cb);
    }

    static findById(id, cb){
        // cb -> a callback function -> execute once done finding the product
        getProductsFromFile(products => {
            // find on every element in the array and 
            // will return the element for which this function we pass returns true
            // pass the product which is currently looking at into the function
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
    */

    /*
    save () {
        return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
                          [this.title, this.price, this.description, this.imageUrl]);
    }

    static deleteById(id) {

    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static fetchById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }

}
*/


/*
// Using sequelize --------------------------------------------------
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;
*/


// Using Mongodb ----------------------------------------------------
const getDb = require('../util/database').getDb;

const mongodb = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Updata the product
            dbOp = db.collection('products')
                .updateOne(
                    { _id: new mongodb.ObjectId(this._id) },
                    { $set: this }
                );
        } else {
            // Insert it
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find()     // return a cursor
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => console.log(err));
    }

    static fetchById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) }).next()
            .then(product => {
                console.log(product);
                return product
            })
            .catch(err => console.log(err));   
    }


}

module.exports = Product;
