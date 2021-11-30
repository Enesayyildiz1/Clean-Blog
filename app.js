const mongoose=require("mongoose")
const express = require('express')
const ejs = require('ejs')
const Blog = require('./models/Blog');
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")
mongoose.connect('mongodb://localhost/clean-blog-test-db')

const myLogger=(req,res,next)=>{
    console.log("Middleware 1");
    next();
}
app.use(myLogger);
app.get('/', async (req, res)=> {
  const blogs=await Blog.find({});
  res.render("index",{blogs});
})
app.get('/about',  (req, res)=> {
  res.render("about")
})
app.get('/post',  (req, res)=> {
  res.render("post")
})
app.get('/add', (req, res)=> {
  res.render("add_post")
})
app.post('/blogs', async(req, res) =>{
  console.log(req.body);
  await Blog.create(req.body)
  res.redirect('/');
});

app.listen(3000)