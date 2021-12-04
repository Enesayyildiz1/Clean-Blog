const Blog = require('../models/Blog');
exports.AboutPage= (req, res)=> {
    res.render("about")
  }
exports.BlogPage= (req, res)=> {
    res.render("blog")
}
exports.AddPostPage=(req, res)=> {
    res.render("add_post")
}