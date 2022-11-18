// Import
let mongoose = require('mongoose');

// Create a model class
let productModel = mongoose.Schema(
    {
        name: String,
        brand: String,
        description: String,
        price: String,
        category: String,
        condition: String
    },
    {
        collection: "products"
    }
);

module.exports = mongoose.model("product", productModel);