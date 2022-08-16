const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    // console.log('In the first middleware!');
    // res.send('<h1>The "Add Product" Page</h1>');    // sending a response
    // res.send('<form action="/admin/add-product" method="post">' +
    //          '<input type="text" name="title">' +
    //          '<button type="submit">Add product</button></form>');

    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render('admin/add-product', { 
        docTitle: 'Add Products',
        path: '/admin/add-product',
        productCSS: true,
        activeProd: true
    });
};


exports.postAddProduct = (req, res, next) => {
    // products.push({ title: req.body.title });
    // console.log(req.body);      // { title: 'Milk' }

    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};


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
            docTitle: 'Shop', 
            path: '/', 
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
            // layout: false       // would not use the default layout?
        });     // look for shop.pug file
    });

};
