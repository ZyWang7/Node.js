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

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products, 
            docTitle: 'Admin Products', 
            path: 'admin/products'
        });
    });
};
