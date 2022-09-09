var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');

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

/* GET home page. */
router.get('/', requireAuth, controlerIndex.home);

module.exports = router;
