var express = require('express');
var router = express.Router();
let productController = require('../controllers/product');


// Helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    } else {
        next();
    }
}

router.get('/list', productController.productList);
router.get('/add', requireAuth, productController.displayAddPage);

router.post('/add', requireAuth, productController.processAddPage);
router.get('/delete/:id', requireAuth, productController.performDelete);


router.get('/check', productController.displaycheckoutPage);
router.post('/check', productController.processcheckoutPage);



router.get('/cart', productController.cartaddPage);
router.post('/cart', productController.AddcartPage);

router.get('/cartList', productController.ListCart);

router.get('/del/:id', productController.performDeleteCart);

router.get('/feedback', productController.displayfeedbackPage);
router.post('/feedback', productController.processAddFeebackPage);

router.get('/feedback/list', productController.displayfeedbackList);







module.exports = router;