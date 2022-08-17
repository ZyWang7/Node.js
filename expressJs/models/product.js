// const products = [];

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

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    // store the product in the array
    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            // this -> refer to the object created based on the class
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });

        /*
        // get the existing product -- read the file at path p
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                // convert json to JS array/object
                products = JSON.parse(fileContent);
            }
        });
        */
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
}
