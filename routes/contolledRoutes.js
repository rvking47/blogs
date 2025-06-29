import express from "express";
import blogAdd from "../models/blogModel.js";
import bodyParser from "body-parser";

const router=express.Router();
router.use(bodyParser.urlencoded({extended:true}));

    //admin urls
   
router.get("/admin/dashboard", async(req,res)=>{
  try{
  const findallad=await blogAdd.find({});
    res.render("pages/dashboard.ejs",{findallad});
  }
  catch(error)
  {
   res.send("blog is not display");
    console.log(error);
  }
})

router.get("/admin/create", (req,res)=>{
    res.render("pages/create.ejs");
})

router.post("/submit", async(req,res)=>{
    try{
    const {title, content, slug}= req.body;
    const blogsave=new blogAdd({title, content, slug});
    await blogsave.save();
    res.redirect("/admin/dashboard");
    }
    catch(error)
    {
    res.send("blog is not create");
    console.log(error);
    }
})

router.get("/admin/edit/:slug", async(req,res)=>{
try{
    const blog = await blogAdd.findOne({ slug: req.params.slug });
    res.render("pages/edit.ejs",{data:blog});
}
 catch(error)
    {
    res.send("blog is not edited");
    console.log(error);
    }
})

router.post("/admin/update", async (req, res) => {
  try {
    const { oldSlug, title, content, newslug } = req.body;

    const newSlug = newslug;

    const result = await blogAdd.updateOne(
      { slug: oldSlug },
      { title, content, slug: newSlug }
    );

    console.log("Update Result:", result);

    if (result.modifiedCount === 0) {
      console.log("No document was updated. Check oldSlug.");
    }

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Error updating blog:", err);
    res.redirect("/admin/dashboard");
  }
});



router.get("/admin/posts", async(req,res)=>{
    try{
    const adminshow=await blogAdd.find({});
    res.render("pages/postlist.ejs", {adminshow});
    }
    catch(error)
    {
        res.send("blog is not create");
    console.log(error);
    }
})

router.get("/admin/delete/:slug",async(req,res)=>{
    try{
     const slug=req.params.slug;
     await blogAdd.deleteOne({slug:slug});
     res.redirect("/admin/dashboard");
    }
    catch(error)
    {
  res.send("blog is not delete");
    console.log(error);
    }
})


//public url
router.get("/", async(req,res)=>{
    try{
    const blogshow=await blogAdd.find({});
    res.render("pages/blog.ejs",{blogshow});
    }
    catch(error)
    {
    res.send("blog is not display");
    console.log(error);
    }
})

router.get("/blog/:slug", async (req, res) => {
  try {
    const blog = await blogAdd.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).send("Blog post not found");
    }

    res.render("pages/slag.ejs", { data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});



export default router;