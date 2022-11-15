const express=require('express')
const router=express.Router()
//middlewares
const blogValidations=require('../Middlewares/blogValidations')
const authorValidations=require('../Middlewares/authorValidations')
const auth= require("../Middlewares/auth")
//Controllers
const createBlog=require('../controllers/blogController')
const createAuthor=require('../controllers/authorController')

router.post("/blogs/create-blog",auth.mid1,blogValidations.blogValidator,createBlog.createBlog)
router.post("/blogs/create-author",authorValidations.autorValidator,createAuthor.createAuthor)
 router.get("/getblog", createBlog.getblog)
 router.post("/login",createAuthor.loginAuthor)
 router.put("/blogs/update-blog/:blogId",auth.mid1,auth.mid2,createBlog.updateBlog)


module.exports=router