var bodyParser = require("body-parser"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    flash      = require("connect-flash"),
    User       = require("./models/user"),
    Blog       = require("./models/blog"),
    Recommendation = require("./models/recommendation"),
    Comment    = require("./models/comment"),
    app        = express(),
    seedBlog   = require("./seedBlog"),
    seedRecommendation = require("./seedRecommendation"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

// seedBlog();
// seedRecommendation();

//ROUTES
var blogRoutes   = require("./routes/blogs"),
    exploreRoutes= require("./routes/explore"),
    indexRoutes  = require("./routes/index"),
    commentRoutes= require("./routes/comments"),
    updateRoutes=  require("./routes/updates");

//APP CONFIG
// mongoose.connect("mongodb://localhost/arka-web-app");
const connectDB =async  () => {
    try {
        mongoose.connect("mongodb+srv://abhishek:abhi123@arka-qfffc.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true});
    } catch (error) {
        console.error(error);
    }
};

connectDB();

app.set("view engine","ejs");

app.use(expressSanitizer());
app.use(require("express-session")({
    secret : "I am loving NodeJS",
    resave : false,
    saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
app.use(methodOverride("_method"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//RESTFUL ROUTES
app.use("/blogs",blogRoutes);
app.use("/explore",exploreRoutes);
app.use("/",indexRoutes);
app.use("/blogs/:id/comments",commentRoutes);
app.use("/updates",updateRoutes);



// const delay = require('delay');
// const pTimeout = require('p-timeout');
 
// const delayedPromise = delay(200);
 
// pTimeout(delayedPromise, 50).then(() => {
//     console.log("site took too long to respond!!");
// });


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("ARKA app has started!!")
});