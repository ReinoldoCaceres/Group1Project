let mongoose = require('mongoose');

let feedbackModel = mongoose.Schema(
    {
        firstName: String,
        LasttName: String,
        email: String,
        comment: String,
    },
    {
        collection: "comments"
    }
);

module.exports = mongoose.model("feedback", feedbackModel);