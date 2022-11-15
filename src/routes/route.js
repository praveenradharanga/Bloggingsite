const express=require('express')
const router=express.Router()
//middlewares
const blogValidations=require('../Middlewares/blogValidations')
const authorValidations=require('../Middlewares/authorValidations')
//Controllers
const createBlog=require('../controllers/blogController')
const createAuthor=require('../controllers/authorController')

router.post("/blogs/create-blog",blogValidations.blogValidator,createBlog.createBlog)
router.post("/blogs/create-author",authorValidations.autorValidator,createAuthor.createAuthor)

module.exports=router