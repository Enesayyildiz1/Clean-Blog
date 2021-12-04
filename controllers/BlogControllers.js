
const Blog = require('../models/Blog');
const fs = require('fs');

exports.getAllBlogs= async (req, res)=> {
    const blogs=await Blog.find({}).sort("-dateCreated");
    res.render("index",{blogs});
};
exports.getBlogById=async(req, res) => {
    const blog=await Blog.findById(req.params.id);
    console.log(blog.image)
    res.render("blog",{blog});
};
exports.updateBlog=async (req,res)=>{
    const blog=await Blog.findById(req.params.id);
    blog.title=req.body.title;
    blog.blog=req.body.blog;
    blog.save()
    res.redirect(`/blogs/${req.params.id}`)
}
exports.UpdateBlogView=async(req,res)=>
{
  const blog=await Blog.findById(req.params.id);
  res.render('edit',{blog});
}
exports.addBlog= async(req, res) =>{
    let uploadedImage;
    let uploadPath;
    console.log(req.body);
    uploadedImage = req.files.image;
    console.log(req.files)
    uploadPath = __dirname + '/../public/images/' + uploadedImage.name;
    uploadedImage.mv(uploadPath, async(err)=> {
      if (err)
        return res.status(500).send(err);
      await Blog.create({
        ...req.body,
        image:'/images/'+uploadedImage.name
      })
      res.redirect('/');
    });
   
}
exports.deleteBlog=async(req,res)=>{
    const blog=await Blog.findByIdAndDelete(req.params.id);
    console.log(__dirname)
    fs.unlink( __dirname +"/../public" + blog.image , (err) => {
      if (err) {
          throw err;
      }
  
      console.log("File is deleted.");
  });
    res.redirect('/');
};