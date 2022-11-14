const express=require('express')
const router=express.Router
//middlewares
const blogValidatons=require('../Middlewares/blogValidations')
//Controllers
const createBlog=require('../controllers/blogController')

router.post("/blogs/create-blog",blogValidatons.blogValidator,createBlog.createBlog)
