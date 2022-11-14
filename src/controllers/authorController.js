const authorModel=require('../Models/authorModel')

const createAuthor=async (req,res)=>{
    try{
    const data=req.body
    const savedData=await authorModel.create(data)
    res.status(201).send({Created:savedData})
}
catch(error){
    res.status(400).send({error:error.message})
}
}
module.exports.createAuthor=createAuthor