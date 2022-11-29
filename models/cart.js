let mongoose = require('mongoose');

// Create a model class
let cartModel = mongoose.Schema(
    {
        name: String,
        brand: String,
        description: String,
        price: String,
        category: String,
        condition: String,
        image: String,
        totalCost:  Number,
    },
    {
        collection: "cart"
    }
);

module.exports = mongoose.model("cart", cartModel);