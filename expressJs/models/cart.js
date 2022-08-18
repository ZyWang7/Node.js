const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
                    'data',
                    'cart.json');


module.exports = class Cart {
    // hold all the product added
    static addProduct(id, productPrice) {
        // fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // analyze the cart => find the existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct){
                // tale all the properties of the existing product
                // and add them to a new JS object
                updatedProduct = { ...existingProduct };
                // increase the quantity
                updatedProduct.quantity ++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // add new product
                updatedProduct = { id: id, quantity: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            //                                 convert the string ti a number
            cart.totalPrice = cart.totalPrice + +productPrice;

            // save the cart back to the file
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

}
