let messageModel = require('../models/message');


exports.home = function(req, res, next) {
    console.log('===> Original URL: ' + req.session.url);

    messageModel.find((err, messagesList) => {
        //console.log(eventList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('product/products-list', {
                title: 'Products List', 
                MessagesList: messagesList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
    // res.render('events/list', { 
    //     title: 'Home',
    //     userName: req.user ? req.user.username : ''
    // });
};