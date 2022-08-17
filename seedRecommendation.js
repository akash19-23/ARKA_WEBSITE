var mongoose = require("mongoose");
var Recommendation = require("./models/recommendation");
var Data = [
    {
        url: "https://www.youtube.com/watch?v=Da-2h2B4faU&t=8s",
        author : {
            username : "Harry"
        }
    },
    {
        url: "https://www.youtube.com/watch?v=BtN-goy9VOY",
        author : {
            username : "Harry"
        }
    },
    {
        url: "https://www.youtube.com/watch?v=uqKGREZs6-w&t=39s",
        author : {
            username : "Harry"
        }
    },
    {
        url: "https://www.youtube.com/watch?v=udFxKZRyQt4",
        author : {
            username : "Harry"
        }
    }
]
function seedRecommendation(){
    Recommendation.remove({},function(err){
        if(err)
        console.log(err);
        console.log("removed Recommendations");
    // Data.forEach(function(seed){
    //     Recommendation.create(seed,function(err,data){
    //         if(err)
    //         console.log(err);
    //         else
    //         console.log("added a recommendation");
    //     });
    // });
    }); 
}
module.exports = seedRecommendation;