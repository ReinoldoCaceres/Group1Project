let mongoose = require('mongoose');

let productModel = mongoose.Schema(
    {
        name: String,
        brand: String,
        description: String,
        price: String,
        category: String,
        condition: String,
        image: String,
    },
    {
        collection: "products"
    }
);

module.exports = mongoose.model("product", productModel);