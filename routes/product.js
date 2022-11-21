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


router.get('/check', requireAuth, productController.displaycheckoutPage);
router.post('/check', requireAuth, productController.processcheckoutPage);


// router.get('/messages-list', requireAuth, messageController.messageList);
// router.get('/details/:id', requireAuth, messageController.details);
// router.get('/success', messageController.displaySuccess);
// router.post('/success', messageController.processAddPage);

// router.get('/delete/:id', requireAuth, messageController.performDelete);


// router.get('/contact-us', messageController.displayAddPage);
// router.post('/contact-us', messageController.processAddPage);


module.exports = router;