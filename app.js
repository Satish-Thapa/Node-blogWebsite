//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogsDB");


const _ = require('lodash');




const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



const blogSchema = new mongoose.Schema({
  name: String,
  blog : String
});

const Blog = mongoose.model("Blod",blogSchema);

const blog1 = new Blog({
  name: "home",
  blog: homeStartingContent
});

// blog1.save();

let contents = [blog1];

// Blog.insertMany([contents],function(err){
//   if(!err){
//     console.log(err);
//   } else {
//     console.log("Sucessfultt added data");

//   }
// });


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  var homeBlog = "";
  Blog.find(function(err,result){
    console.log("aani ma bhaye");
    if(!err){
      homeBlog = result[0].blog;
      console.log(homeBlog);
      res.render("home",{homeStartingContent: homeBlog, contents:contents});
    } else {
      console.log(err);
  
    }

  });
 
  
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/posts/:day",function(req,res){
 
  let para = _.lowerCase( req.params.day);
  contents.forEach(function(item){
      if(para == _.lowerCase(item.title)){
        res.render("post",{head:item.title,post: item.blog});
      }else{
        console.log("match not found");
      }
  });
});

const composeSchema = new mongoose.Schema({
 title : String,
 blog : String
})

const Compose = mongoose.model("Compose",composeSchema);

app.post("/compose",function(req,res){
  content = {
    
  }
  const comp1 = new Compose({
    title: req.body.postTitle,
    blog: req.body.postBody
  })
  contents.push(content);
  res.redirect("/");
  
});
app.get("/compose",function(req,res){
  res.render("compose");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
