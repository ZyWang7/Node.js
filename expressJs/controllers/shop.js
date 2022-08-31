const Product = require('../models/product');
const Cart = require('../models/cart');

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
    /*
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products, 
            docTitle: 'All Products', 
            path: '/products'
        });
    });
    */

    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                docTitle: 'All Products',
                path: '/products'
            });
        })
        .catch( err => console.error(err) );
};


exports.getProduct = (req, res, next) => {
    // extract the dynamic params
    const prodId = req.params.productId;
    /*
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product,
            docTitle: product.title,
            path: '/products'
        });
    });
    */

    Product.fetchById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                docTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    
};


exports.getIndex = (req, res, next) => {
    /* get info from file ---------------------------------
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products, 
            docTitle: 'Shop', 
            path: '/'
        });
    });
    ---------------------------------------------------- */

    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows, 
                docTitle: 'Shop', 
                path: '/'
            });
        })
        .catch( err => console.error(err) );
};


exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProdData = cart.products.find(prod => prod.id === product.id);
                if(cartProdData) {
                    cartProducts.push({prodData: product, qty: cartProdData.quantity});
                }
            }
             res.render('shop/cart', { 
                path: '/cart', 
                docTitle: 'Your Cart',
                products: cartProducts
            });
        });
       
    });
    
};


exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};


exports.postCartDeleteProd = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
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
