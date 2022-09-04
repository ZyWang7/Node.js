const Product = require('../models/product');
// const User = require('../models/user');

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

    // create a new associate object -> automatically create a connected model
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        // userId: req.user.id
    })
    .then(result => {
        // console.log(result)
        console.log('Create Product');
        res.redirect('/admin/products');
    })
    .catch(err => console.error(err));

    /*
    const product = new Product(null, title, imageUrl, price, description);
    product.save()
        .then(() => {
            // only redirect once the insert is completed
            res.redirect('/');
        })
        .catch(err => console.log(err));
    */
};


// exports.getEditProduct = (req, res, next) => {
//     // the extracted value is always a String
//     const editMode = req.query.edit;
//     if (!editMode) {
//         res.redirect('/');
//     }
//     const prodId = req.params.productId;

//     req.user.getProducts({where: {id: prodId}})
//     // using sequelize
//     // Product.findByPk(prodId)
//         .then(products => {
//             const product = products[0];
//             if (!product) {
//                 return res.redirect('/');
//             }
//             res.render('admin/edit-product', { 
//                 docTitle: 'Add Products',
//                 path: '/admin/edit-product',
//                 editing: editMode,
//                 product: product
//             });
//         })
//         .catch(err => console.log(err));

//     /*
//     Product.findById(prodId, product => {
//         if (!product) {
//             return res.redirect('/');
//         }
//         res.render('admin/edit-product', { 
//             docTitle: 'Add Products',
//             path: '/admin/edit-product',
//             editing: editMode,
//             product: product
//         });
//     });
//     */
    
// };


// exports.postEditProduct = (req, res, next) => {
//     // fetch the info for the product
//     const prodId = req.body.productId;
//     const newTitle = req.body.title;
//     const newimageUrl = req.body.imageUrl;
//     const newPrice = req.body.price;
//     const newDescription = req.body.description;
//     // create a new product instance
//     /*
//     const newProduct = new Product(prodId, newTitle, newimageUrl, newPrice, newDescription);

//     newProduct.save();
//     res.redirect('/admin/products');
//     */

//     // using sequelize
//     Product.findByPk(prodId)
//         .then(product => {
//             // updata local variables
//             product.title = newTitle;
//             product.imageUrl = newimageUrl;
//             product.price = newPrice;
//             product.description = newDescription;
//             // save back to database
//             // if the product does not exist -> will create new one
//             // otherwise, update/overwrite the existing one
//             return product.save();
//         })
//         .then(result => {
//             console.log('UPDATED PRODUCT!');
//             res.redirect('/admin/products');
//         }) // handle any success response from the save promise
//         .catch(err => console.log(err));

// };


// exports.getProducts = (req, res, next) => {
//     /* get data using database
//     Product.fetchAll((products) => {
//         res.render('admin/products', {
//             prods: products, 
//             docTitle: 'Admin Products', 
//             path: 'admin/products'
//         });
//     });
//     */

//     // using sequelize
//     req.user.getProducts()
//     // Product.findAll()
//         .then(products => {
//             res.render('admin/products', {
//                 prods: products, 
//                 docTitle: 'Admin Products', 
//                 path: 'admin/products'
//             });
//         })
//         .catch(err => console.error(err));
// };


// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     // Product.deleteById(prodId);

//     // delete the product using sequelize
//     // Product.destroy({where:});
//     Product.findByPk(prodId)
//         .then(product => {
//             return product.destroy();
//         })
//         .then(ersult => {
//             console.log('PRODUCT DELETED');
//             res.redirect('/admin/products/');
//         })
//         .catch(err => console.error(err));
// };
