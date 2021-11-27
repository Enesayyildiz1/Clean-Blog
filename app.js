const { application } = require('express');
const express = require('express')
const ejs = require('ejs')
const app = express()
app.use(express.static('public'))
app.set("view engine","ejs")
const myLogger=(req,res,next)=>{
    console.log("Middleware 1");
    next();
}
app.use(myLogger);
app.get('/', function (req, res) {
    res.render("index")
})
app.get('/about', function (req, res) {
  res.render("about")
})
app.get('/post', function (req, res) {
  res.render("post")
})
app.get('/add', function (req, res) {
  res.render("add_post")
})
 
app.listen(3000)