var express = require("express");
var router  = express.Router({mergeParams:true});
var Recommendation = require("../models/recommendation");
var middleware = require("../middleware");

router.get("/",function(req,res){
    Recommendation.find({},function(err,allBlogs){
        if(err)
        console.log(err);
        else
        res.render("explore",{recommendation:allBlogs});
    });
})
router.post("/",middleware.isLoggedIn,function(req,res){
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newRecommendation = {url : req.body.url , author : author};
    Recommendation.create(newRecommendation,function(err,newlyCreated){
        if(err){
         res.redirect("/explore")
        }else{
            req.flash("success","Your recommendation was successfully added.");
            res.redirect("/explore");
        }  
    })
})
router.delete("/:recommendation_id",middleware.checkRecommendationOwnership,function(req,res){
    Recommendation.findByIdAndRemove(req.params.recommendation_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Successfully deleted your recommendation.");
            res.redirect("/explore");
        }
    })
})

module.exports = router;