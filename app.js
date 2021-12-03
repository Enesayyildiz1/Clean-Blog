const mongoose=require("mongoose")
const express = require('express')
const ejs = require('ejs')
const fileUpload = require('express-fileupload');
const Blog = require('./models/Blog');
const methodOverride = require('method-override')
const app = express()
const fs = require('fs');

app.use(fileUpload());
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))
app.set("view engine","ejs")
mongoose.connect('mongodb://localhost/clean-blog-test-db')

const myLogger=(req,res,next)=>{
    console.log("Middleware 1");
    next();
}
app.use(myLogger);
app.get('/', async (req, res)=> {
  const blogs=await Blog.find({}).sort("-dateCreated");
  res.render("index",{blogs});
})
app.get('/about',  (req, res)=> {
  res.render("about")
})
app.get('/blog',  (req, res)=> {
  res.render("blog")
})
app.get('/add', (req, res)=> {
  res.render("add_post")
})
app.post('/blogs', async(req, res) =>{
  let uploadedImage;
  let uploadPath;
  console.log(req.body);
  uploadedImage = req.files.image;
  console.log(req.files)
  uploadPath = __dirname + '/public/images/' + uploadedImage.name;
  uploadedImage.mv(uploadPath, async(err)=> {
    if (err)
      return res.status(500).send(err);
    await Blog.create({
      ...req.body,
      image:'/images/'+uploadedImage.name
    })
    res.redirect('/');
  });
 
})
app.get('/blogs/edit/:id',async(req,res)=>
{
  const blog=await Blog.findById(req.params.id);
  res.render('edit',{blog});
})
app.get('/blogs/:id', async(req, res) => {
  const blog=await Blog.findById(req.params.id);
  console.log(blog.image)
  res.render("blog",{blog});
});
app.put('/blogs/:id',async (req,res)=>{
  const blog=await Blog.findById(req.params.id);
  blog.title=req.body.title;
  blog.blog=req.body.blog;
  blog.save()
  res.redirect(`/blogs/${req.params.id}`)
})

app.delete('/blogs/:id',async(req,res)=>{
  const blog=await Blog.findByIdAndDelete(req.params.id);

  fs.unlink(`${__dirname}/public${blog.image}`, (err) => {
    if (err) {
        throw err;
    }

    console.log("File is deleted.");
});
  res.redirect('/');
})

app.listen(3000)