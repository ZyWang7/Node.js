const Product = require('../models/product');
// const Cart = require('../models/cart');
// const CartItem = require('../models/cart-item');

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

    /* fetch data using database --------------------------
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                docTitle: 'All Products',
                path: '/products'
            });
        })
        .catch( err => console.error(err) );
    ---------------------------------------------------- */
    
    /*
    // fetch data using sequelize
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                docTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => console.error(err));
    */


    // using Mongodb
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                docTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => console.error(err));

    
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

    /* fetch data using database --------------------------
    Product.fetchById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                docTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    ---------------------------------------------------- */


    // using Mongodb
    Product.fetchById(prodId)

    // fetch data using sequelize
    // Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                docTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    
    
    // alternative way
    /*
    Product.findAll({ where: {id: prodId} })
        .then(products => {
            res.render('shop/product-detail', {
                product: products[0],
                docTitle: products[0].title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    */
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

    /* get info from database -----------------------------
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows, 
                docTitle: 'Shop', 
                path: '/'
            });
        })
        .catch( err => console.error(err) );
    ---------------------------------------------------- */
    

    // fetch data using sequelize
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products, 
                docTitle: 'Shop', 
                path: '/'
            });
        })
        .catch(err => console.error(err));
};


exports.getCart = (req, res, next) => {
    /* get info from file ---------------------------------
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
    */

    // fetch data using sequelize
    // use cart to associated with wxisting user to get all the products in it
    /*
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                        .then(products => {
                            res.render('shop/cart', { 
                                path: '/cart', 
                                docTitle: 'Your Cart',
                                products: products
                            });
                        })
                        .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    */

    // using Mongodb
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', { 
                path: '/cart', 
                docTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
    
};


exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    // using Mongodb
    Product.fetchById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));

    // let fetchedCart;
    // let newQuantity = 1;

    /*
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
    */

    /*
    req.user
        .getCart()
        .then(cart => {
            // check if product is already in cart
            fetchedCart = cart;
            return cart.getProducts({ where: {id: prodId} });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                // increase quantity
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }

            // add new one
            return Product.findByPk(prodId)       // find the genernal product data  
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                    through: { quantity: newQuantity}
                });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
        */

};


exports.postCartDeleteProd = (req, res, next) => {
    const prodId = req.body.productId;
    /*
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: {id: prodId} });
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    */

    // using Mongodb
    req.user.deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));

    
    /*
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
    */
};


exports.postOrder = (req, res, next) => {
    let fetchedCart;
    // get all the cart items
    /*
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
             return req.user.createOrder()
                .then(order => {
                    order.addProduct(
                        products.map(product => {
                            product.orderItem = { quantity: product.cartItem.quantity };
                            return product;
                        })
                    );
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
    */

    // using Mongodb
    req.user.addOrder()
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));

};


exports.getOrders = (req, res, next) => {
    /*
    req.user.getOrders({include: ['products']})     // eager loading
        .then(orders => {
            res.render('shop/orders', { 
                path: '/orders', 
                docTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
    */

    // using Mongodb
    req.user.getOrders()
        .then(orders => {
            res.render('shop/orders', { 
                path: '/orders', 
                docTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};

/*
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { 
        path: '/checout', 
        docTitle: 'Checkout'
    });
};
*/
