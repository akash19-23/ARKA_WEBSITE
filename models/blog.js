var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    comments: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ],
    title: String,
    image: String,
    body: String,
    created: {type:Date, default: Date.now},
    author: {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    }
});
module.exports = mongoose.model("Blog",blogSchema);
