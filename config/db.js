// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://ths0ad439fwe12439:HH4K3rVTeFweT59@cluster0.fqmzfjn.mongodb.net/?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}