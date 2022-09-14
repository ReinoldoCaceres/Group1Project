// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://ReinoldoGlobal:BNif4CQdDibbfYr@cluster0.dbt9bq0.mongodb.net/?retryWrites=true&w=majority";

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

    // ReinoldoGlobal
    // BNif4CQdDibbfYr
}