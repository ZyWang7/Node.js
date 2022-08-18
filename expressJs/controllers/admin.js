const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // console.log('In the first middleware!');
    // res.send('<h1>The "Add Product" Page</h1>');    // sending a response
    // res.send('<form action="/admin/add-product" method="post">' +
    //          '<input type="text" name="title">' +
    //          '<button type="submit">Add product</button></form>');

    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render('admin/edit-product', { 
        docTitle: 'Add Products',
        path: '/admin/add-product',
        editing: false
    });
};


exports.postAddProduct = (req, res, next) => {
    // products.push({ title: req.body.title });
    // console.log(req.body);      // { title: 'Milk' }

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};


exports.getEditProduct = (req, res, next) => {
    // the extracted value is always a String
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', { 
            docTitle: 'Add Products',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
    
};


exports.postEditProduct = (req, res, next) => {
    // fetch the info for the product
    const prodId = req.body.productId;
    const newTitle = req.body.title;
    const newimageUrl = req.body.imageUrl;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    // create a new product instance
    const newProduct = new Product(prodId, newTitle, newimageUrl, newPrice, newDescription);

    newProduct.save();
    res.redirect('/admin/products');
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


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    
};
