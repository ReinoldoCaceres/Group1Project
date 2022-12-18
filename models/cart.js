let mongoose = require('mongoose');

let cartModel = mongoose.Schema(
    {
        name: String,
        brand: String,
        description: String,
        price: Number,
        category: String,
        condition: String,
        image: String,
        totalCost:  Number,
    },
    {
        collection: "carts"
    }
);

module.exports = mongoose.model("cart", cartModel);