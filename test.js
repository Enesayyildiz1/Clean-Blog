const mongoose=require("mongoose")
const Schema=mongoose.Schema;

mongoose.connect('mongodb://localhost/clean-blog-test-db')

const BlogSchema=new Schema({
    title:String,
    description:String
})

const Blog=mongoose.model('Blog', BlogSchema)

Blog.create({
    title:"Photo Title 1",
    description:"Photo Description 1"
});

Blog.find({},(err,data)=>
{
    console.log(data);
})
const id="61a3d9fd901f216083fd9481";
Blog.findByIdAndUpdate(id,
    {
        title:"Photo Title 2",
        description:"Photo description 2"
    },
    (err,data)=>{
    console.log("Photo has updated");
});