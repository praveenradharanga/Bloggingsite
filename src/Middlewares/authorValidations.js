const authorModel=require('../Models/authorModel')
const autorValidator=async (req,res,next)=>{
    const mandatoryFields=["fname","lname","email","password"]
    for(let i of mandatoryFields){
        req.body[i]=req.body[i].trim()
    }
    const validate=(prop,regx)=>{
        
        if(!req.body[prop]){                     
            return false
        }
        const result=req.body[prop].match(regx)
        
        if(!result){
            return false
        }
        else{
        return true
        }
    }
    for(let i of mandatoryFields){
        if(i=='fname'||i=='lname'){
        if(!validate(i,/^[A-Za-z]+$/)){
            return res.status(400).send({msg:`${i} not valid`})
        }
        }
        else if(i=='email'){
            if(!validate(i,/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)){
                return res.status(400).send({msg:`${i} not valid`})
            } 
        }
        
        else{
            if(!validate(i,/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)){
                return res.status(400).send({msg:`${i} not valid use combination chracters,special symbols and digits 7-15 characters`})
            } 
        }
    }
    if(!["Mr", "Mrs", "Miss"].includes(req.body.title)){
        return res.status(400).send({msg:"Title is not valid!"}) 
    }
    const validEmail=await (await authorModel.find().select({_id:0,email:1})).map((author)=>{
       return  author.email
    })
    if(validEmail.includes(req.body.email)){
    return res.status(400).send({msg:"Duplicate email"})
    }
    next()
}
module.exports.autorValidator=autorValidator