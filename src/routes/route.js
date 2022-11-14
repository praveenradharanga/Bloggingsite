const express=require('express')
const router=express.Router()
//middlewares
const blogValidatons=require('../Middlewares/blogValidations')
//Controllers
const createBlog=require('../controllers/blogController')
const createAuthor=require('../controllers/authorController')

router.post("/blogs/create-blog",blogValidatons.blogValidator,createBlog.createBlog)
router.post("/blogs/create-author",createAuthor.createAuthor)

module.exports=router