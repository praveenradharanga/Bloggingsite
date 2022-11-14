
const blogValidator=function(req,res,next){
    const data=req.body
    if(!isValidObjectId(data.authorId)){
        return res.status(400).send({error: "authorId is not found"})
    }
    // else{
    //     if(!data.title){
    //         return res.status(400).send({error: "title is not found"})
    //     }
    //     if(!data.body){
    //         return res.status(400).send({error: "body is not found"})
    //     }
    // }
    next()
}
module.exports.blogValidator=blogValidator