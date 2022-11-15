const { isValidObjectId } = require('mongoose');
const blogModel=require('../Models/blogModel')
//create blog
const createBlog=async function(req,res){
    try{
    const data=req.body;
     const createdData=await blogModel.create(data)
        return res.status(201).send({successful:createdData})
    }
catch(error){
    res.status(500).send({error:error.message})
}
}

//update blog
const updateBlog = async (req,res)=>{
    try{
    const updateDetails=req.body
    const blogId=req.params.blogId
    if(!isValidObjectId(blogId)){
        return res.status(400).send({msg:"Invalid Blog ID"})
    }
    const blog=await blogModel.findById(blogId)
    if(!blog||blog.isDeleted){
        return res.status(400).send({msg:"No blog found with the given ID"})
    }
        
    for(let i in updateDetails){
        if(i=='tags'){
            for(let j of updateDetails.tags){
                blog.tags.push(j)
            }
        }
        else if(i=='subcategory'){
            for(let j of updateDetails.subcategory){
                blog.subcategory.push(j)
            }
        }
        else{
            blog[i]=updateDetails[i]
            

        }
    }

    blog.save()

res.status(200).send({msg:blog})
    }
    catch(error){
        res.status(500).send({err_msg:error.message})
    }
}

//delete blog
const deleteBlog=async (req,res)=>{
    try{
    const blogId=req.params.blogId
    if(!isValidObjectId(blogId)){
        return res.status(400).send({msg:"BlogId is invalid"})
    }
    const blog=await blogModel.findById(blogId)
    if(!blog||blog.isDeleted){
       return res.status(400).send({msg:"Blog is not available"})
    }
    blog.isDeleted=true
    blog.save()
    res.status(200).send()
}
catch(error){
    res.status(500).send({err_msg:error.message})
}
}

//get blogs API
const getblog= async (req,res)=>{
    try
    {
    let id=req.query.authorid
    let category=req.query.category
    let subcategory=req.query.subcategory
    let tag=req.query.tags
      if(id){
        if(!isValidObjectId(id)){
            return res.status(400).send({msg: "Author ID is not valid"})
        }
        const validAuthorIds= (await authorModel.find().select({_id:1})).map((author)=>author._id.toString())
    
        // return res.send({msg: typeof validAuthorIds[0]})
        
        if(!validAuthorIds.includes(id)){
        return res.status(400).send({msg: "Author is not registered"})
        }
        let blog=await blogModel.find({authorId:id}).populate('authorId')
        return res.status(200).send({status:true,data:blog})
      }
  // check by category
   else  if(category){
        let allcat=await blogModel.find({category:category,isDeleted:false,published:true }).populate('authorId')
        if(allcat.length==0)
        return res.status(404).send({status:false, msg:"sorry your request not found"})
        else 
        return res.status(200).send({status:true,data:allcat})
    }
    // check subcategory
    else if(subcategory){
        let allsub=await blogModel.find({subcategory:subcategory,isDeleted:false,published:false}).populate('authorId')
        if(allsub.length==0)
        return res.status(404).send({status:false, msg:"sorry your request not found"})
        else 
        return res.status(200).send({status:true,data:allsub})
    }     // using tags check 
    else if(tag){
        let all=await blogModel.find({isDeleted:false,published:false,tags:tag}).populate('authorId')
        if(all.length==0)
        return res.status(404).send({status:false, msg:"sorry your request not found"})
        else 
        return res.status(200).send({status:true,data:all})
    }

   // if not match any condation then excute the these statement
    let allblogs=await blogModel.find()
    res.status(200).send({status:true,data:allblogs})
}
catch(error){
    res.status(500).send("Server error",error.message)
}
}

module.exports.createBlog=createBlog
module.exports.updateBlog=updateBlog
module.exports.deleteBlog=deleteBlog
module.exports.getblog=getblog