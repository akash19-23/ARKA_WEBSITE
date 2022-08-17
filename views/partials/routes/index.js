var express = require("express");
var router  = express.Router({mergeParams:true});
var User  = require("../models/user");
var passport = require("passport");
var Update = require("../models/Update");
var middleware = require("../middleware");

router.get("/",function(req,res){
    Update.find({},(err,allUpdates) => {
        if(err){
            console.log(err);
        }else{
            var latestUpdates ;
            if(allUpdates){
                    latestUpdates = [allUpdates.reverse()[0]];
            }
            res.render("index",{currentUser:req.user,update:latestUpdates});
        }
    })
    
});
router.get("/members",function(req,res){
    res.render("members");
})
//===========
//AUTH ROUTES
//===========
router.get("/register",function(req,res){
    res.render("auth/register");
})
router.post("/register",function(req,res){
    User.register(new User({username : req.body.username, email : req.body.email, admin : false}),req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            res.render("auth/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","ARKA welcomes you, "+ user.username);
                res.redirect("/");
        })
        }
    })
})


router.get("/login",function(req,res){
    res.render("auth/login");
})
router.post("/login",passport.authenticate("local",{
    successRedirect : "/",
    failureRedirect : "/login"
}),function(req,res){
});
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Successfully logged out.");
    res.redirect("/");
})


module.exports = router;