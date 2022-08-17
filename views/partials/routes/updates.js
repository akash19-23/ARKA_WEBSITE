var express = require("express");
var router  = express.Router({mergeParams:true});
var Update= require("../models/Update");
var middleware = require("../middleware");
var expressSanitizer = require("express-sanitizer");


router.get("/",function(req,res){
    Update.find({},function(err,allUpdates){
        if(err)
        console.log(err);
        else
        res.render("updates/updates",{updates:allUpdates});
    });
})

router.get("/new",middleware.isAdmin,function(req,res){
    res.render("updates/new-update");
})

router.post("/",middleware.isAdmin,function(req,res){
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newUpdate = { title: req.body.title,datetime : req.body.datetime,instagram:req.body.instagram, facebook:req.body.facebook , description : req.sanitize(req.body.description), author : author};
    Update.create(newUpdate,function(err,newlyCreated){
        if(err)
        console.log(err);
        else{
            res.redirect("/updates");
        }
    })
});

router.delete("/:id",middleware.isAdmin,function(req,res){
    Update.findByIdAndRemove(req.params.id,function(err){
        if(err){
            req.flash("error",err.message);
            res.redirect("/updates");
        }else{
            req.flash("success","Successfully deleted update.");
            res.redirect("/updates");
        }
    })
})

module.exports = router;