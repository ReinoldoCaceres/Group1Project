let messageModel = require('../models/message');
let productModel = require('../models/products');


exports.home = function(req, res, next) {
    console.log('===> Original URL: ' + req.session.url);

    productModel.find((err, productList) => {
        //console.log(eventList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('products/products-list', {
                title: 'Products List', 
                ProductList: productList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
};