const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    // store the product in the array
    save() {
        // this -> refer to the object created based on the class
        products.push(this);
    }

    // retrieve all the products
    static fetchAll() {
        return products;
    }
}
