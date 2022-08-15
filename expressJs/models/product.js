// const products = [];

const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    // store the product in the array
    save() {
        const p = path.join(path.dirname(process.mainModule.filename),
                            'data',                 // folder name
                            'products.json');       // file name
        
        // get the existing product -- read the file at path p
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                // convert json to JS array/object
                products = JSON.parse(fileContent);
            }
            
            // this -> refer to the object created based on the class
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    // retrieve all the products
    static fetchAll() {
        const p = path.join(path.dirname(process.mainModule.filename),
                            'data',
                            'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return [];
            }

            return JSON.parse(fileContent);
        });
    }
}
