var     User       = require("../models/user"),
Blog       = require("../models/blog"),
Recommendation = require("../models/recommendation"),
Comment    = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id,function(err,foundBlog){
            if(err){
                req.flash("error",err.message);
                res.redirect("back");
            }else{
                if(foundBlog.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You do not have permission to do that !");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error","You need to be logged in first !");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                req.flash("error",err.message);
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You do not have permission to do that !");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error","You need to be logged in first !");
        res.redirect("back");
    }
}
middlewareObj.checkRecommendationOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Recommendation.findById(req.params.recommendation_id,function(err,foundRecommendation){
            if(err){
                req.flash("error",err.message);
                res.redirect("back");
            }else{
                if(foundRecommendation.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You do not have permission to do that !");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error","You need to be logged in first !");
        res.redirect("back");
    }
}
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in first !");
    res.redirect("/login");
    
}
middlewareObj.isAdmin = function(req,res,next){
    if(req.isAuthenticated()){
        // if(req.user.admin.toString()=="true")
            return next();
    }
    req.flash("error","Only admins can add updates.");
    res.redirect("/updates");
    
}
module.exports = middlewareObj;