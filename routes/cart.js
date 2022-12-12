var express = require('express');
var router = express.Router();
let productController = require('../controllers/product');

function requireAuth(req, res, next)
{
    
    if(!req.isAuthenticated()) {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    } else {
        next();
    }
}

router.get('/add/:id', productController.performAddToCart);


module.exports = router;