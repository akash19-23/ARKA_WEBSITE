var mongoose = require("mongoose");

var recommendationSchema = new mongoose.Schema({
    url : String,
    author: {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    }
})
module.exports = mongoose.model("Recommendation",recommendationSchema);