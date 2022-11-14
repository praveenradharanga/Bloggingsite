const blogModel=require('../Models/blogModel')
const createBlog=async function(req,res){
    try{
    const data=req.body;
     const createdData=await blogModel.create(data)
        return res.status(201).send({successful:createdData})
    }
catch(error){
    res.status(400).send(error)
}
}
module.exports.createBlog=createBlog