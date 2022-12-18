var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');

function requireAuth(req, res, next)
{

    if(!req.isAuthenticated()) {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    } else {
        next();
    }
}

router.get('/', requireAuth, controlerIndex.home);

module.exports = router;
