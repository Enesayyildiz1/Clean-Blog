const mongoose=require("mongoose")
const express = require('express')
const ejs = require('ejs')
const fileUpload = require('express-fileupload');
const Blog = require('./models/Blog');
const methodOverride = require('method-override')
const app = express()
const fs = require('fs');
const blogController=require('./controllers/BlogControllers')
const pageController=require('./controllers/PageControllers')
app.use(fileUpload());
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))
app.set("view engine","ejs")
mongoose.connect('mongodb://localhost/cleann-blog-test-db');
app.get('/about',pageController.AboutPage); 
app.get('/blog', pageController.BlogPage);
app.get('/add', pageController.AddPostPage);
app.get('/',blogController.getAllBlogs);
app.post('/blogs', blogController.addBlog);
app.get('/blogs/edit/:id',blogController.UpdateBlogView);
app.get('/blogs/:id', blogController.getBlogById);
app.put('/blogs/:id',blogController.updateBlog);
app.delete('/blogs/:id',blogController.deleteBlog);
app.listen(3000)