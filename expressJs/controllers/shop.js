const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    // console.log('In another middleware!');
    // res.send('<h1>Hello from express</h1>');
    
    // __dirname -> holds the absolute path on operating system to this project folder
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));

    // console.log('shop: ', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // const products = adminData.products;

    // use the default template engine and return that template
    //                  convert object to .pug file

    // const products = Product.fetchAll();
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products, 
            docTitle: 'All Products', 
            path: '/products'
        });
    });
};


exports.getProduct = (req, res, next) => {
    // extract the dynamic params
    const prodId = req.params.productId;
    res.redirect('/');
};


exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products, 
            docTitle: 'Shop', 
            path: '/'
        });
    });
};


exports.getCart = (req, res, next) => {
    res.render('shop/cart', { 
        path: '/cart', 
        docTitle: 'Your Cart'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { 
        path: '/orders', 
        docTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { 
        path: '/checout', 
        docTitle: 'Checkout'
    });
};