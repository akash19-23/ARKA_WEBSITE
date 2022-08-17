var mongoose = require("mongoose");

var updateSchema = new mongoose.Schema({
    title: String,
    description: String,
    datetime: {type:Date, default: Date.now},
    author: {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    },
    facebook:String,
    instagram : String
});
module.exports = mongoose.model("Update",updateSchema);
