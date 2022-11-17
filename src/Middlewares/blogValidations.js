const authorModel=require('../Models/authorModel')
const{isValidObjectId}=require('mongoose')
const blogValidator=async (req,res,next)=>{
    if(!req.body.authorId){
        return res.status(400).send({msg: "Author ID is not present"})
    }
    if(!isValidObjectId(req.body.authorId)){
        return res.status(400).send({msg: "Author ID is not valid"})
    }
    const validAuthorIds= (await authorModel.find().select({_id:1})).map((author)=>author._id.toString())

    // return res.send({msg: typeof validAuthorIds[0]})
    
    if(!validAuthorIds.includes(req.body.authorId)){
    return res.status(400).send({msg: "Author is not registered"})
    }

    if(req.body.authorId!=req.abc.authorId){
        return res.status(400).send({msg: "Unauthorised"}) 
    }

    const mandatoryFields=["title","body","tags","category","subcategory"]
    const isAvailable = (data)=>{
        if(!req.body[data]){
            return false
        }
        return true
    }
    for(let i of mandatoryFields){
        if( !isAvailable(i)){
        return  res.status(400).send({err_msg:`${i} is not present`})
        }
     }
     if(typeof req.body.tags!='object'){
        return res.status(400).send({msg:"Please enter an array of tags"})
     }
     if(req.body.tags.length==0){
        return  res.status(400).send({err_msg:"Tags are empty"})
     }
     if(typeof req.body.subcategory!='object'){
        return res.status(400).send({msg:"Please enter an array of subcategory"})
     }
     if(req.body.subcategory.length==0){
        return  res.status(400).send({err_msg:"Subcategory is empty"})
     }

     for(let i of req.body.tags){
        if(typeof i!='string'){
            return res.status(400).send({msg:"Tags must contain strings"})
        }
     }

     for(let i of req.body.subcategory){
        if(typeof i!='string'){
            return res.status(400).send({msg:"Subcategory must contain strings"})
        }
     }

     next()

}

module.exports.blogValidator=blogValidator