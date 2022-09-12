// Import
let mongoose = require('mongoose');

// Create a model class
let messageModel = mongoose.Schema(
    {
        name: String,
        email: String,
        message: String
    },
    {
        collection: "messages"
    }
);

module.exports = mongoose.model("Message", messageModel);