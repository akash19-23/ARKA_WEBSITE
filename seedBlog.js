var mongoose = require("mongoose");
var Blog       = require("./models/blog");
var Comment  = require("./models/comment");


var Data=[
    {
        title:"Exoplanet where it rains iron discovered",
        image:"https://www.sciencedaily.com/images/2020/03/200311121832_1_540x360.jpg",
        body: "This result was obtained from the very first science observations done with ESPRESSO, in September 2018, by the scientific consortium who built the instrument: a team from Portugal, Italy, Switzerland, Spain and ESO."
    },
    {
        title:"The strange orbits of 'Tatooine' planetary disks",
        image:"https://www.sciencedaily.com/images/2020/03/200319103209_1_540x360.jpg",
        body:"This result was obtained from the very first science observations done with ESPRESSO, in September 2018, by the scientific consortium who built the instrument: a team from Portugal, Italy, Switzerland, Spain and ESO."
    },
    {
        title:"Mercury's scorching daytime heat may help it make its own ice at caps",
        image:"https://www.sciencedaily.com/images/2020/03/200313155329_1_540x360.jpg",
        body:"This result was obtained from the very first science observations done with ESPRESSO, in September 2018, by the scientific consortium who built the instrument: a team from Portugal, Italy, Switzerland, Spain and ESO."
    }
]
function seedBlogs(){
    Blog.remove({},function(err){
        if(err)
        console.log(err);
        else
        console.log("removed Blogs");
    Data.forEach(function(seed){
        Blog.create(seed,function(err,blog){
            if(err)
            console.log(err);
            else{
            console.log("added a blog");
            Comment.create({
                text : "This is such an interesting fact!!",
                author : "Sherlock"
            },function(err,comment){
                if(err){
                    console.log(err);
                }else {
                blog.comments.push(comment);
                blog.save();
                console.log(blog);
                console.log("created new comment!")
            }})
        }
     })
   })
 }) 
}
module.exports = seedBlogs;