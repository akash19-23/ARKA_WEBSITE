var express = require("express");
var router  = express.Router({mergeParams:true});
var Blog  = require("../models/blog");
var Comment    = require("../models/comment");
var middleware = require("../middleware");
var expressSanitizer = require("express-sanitizer");


router.get("/",function(req,res){
    Blog.find({},function(err,allBlogs){
        if(err)
        console.log(err);
        else
        res.render("blogs/blog",{blogs:allBlogs});
    });
})

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("blogs/new-blog");
})

router.post("/",middleware.isLoggedIn,function(req,res){
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newBlog = { title: req.body.title, image : req.body.image , body : req.sanitize(req.body.body), author : author};
    Blog.create(newBlog,function(err,newlyCreated){
        if(err)
        console.log(err);
        else{
            res.redirect("/blogs");
        }
    })
})
//SHOW ROUTE FOR BLOGS
router.get("/:id",function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
        if(err)
        console.log(err);
        else{
        res.render("blogs/show-blog",{blog:foundBlog});
        }
    })
})

router.get("/:id/edit",middleware.checkBlogOwnership,function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("blogs/edit",{blog:foundBlog});
        }
    })
})

router.put("/:id",middleware.checkBlogOwnership,function(req,res){
    var updateBlog = {title : req.body.title,image : req.body.image, body : req.body.body};
    Blog.findByIdAndUpdate(req.params.id,updateBlog,function(err,updatedBlog){
        if(err){
            req.flash("error",err.message);
        }
        req.flash("success","Successfully updated blog.");
        res.redirect("/blogs/"+ req.params.id);
    })
})

router.delete("/:id",middleware.checkBlogOwnership,function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            req.flash("error",err.message);
            res.redirect("/blogs");
        }else{
            req.flash("success","Successfully deleted blog.");
            res.redirect("/blogs");
        }
    })
})

module.exports = router;