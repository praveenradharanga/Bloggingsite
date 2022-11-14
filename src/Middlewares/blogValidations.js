const {isValidObjectId}=require('mongoose')
const blogValidator=function(req,res,next){
  try{
    const data=req.body
    if(!isValidObjectId(data.authorId)){
        return res.status(400).send({error: "authorId is not found"})
    }
    next()
}
catch(error){
    res.status(400).send({error:error.message})
}
}
module.exports.blogValidator=blogValidator