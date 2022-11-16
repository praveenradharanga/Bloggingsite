const authorModel=require('../Models/authorModel')
const autorValidator=async (req,res,next)=>{
    const mandatoryFields=["fname","lname","title","password","email"]
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
    if(!["Mr", "Mrs", "Miss"].includes(req.body.title)){
        return  res.status(400).send({err_msg:`title is not valid`})
    }
    ///^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/  
    const vEmail=req.body.email.match(/^[a-zA-Z][-_.a-zA-Z0-9]{5,29}@g(oogle)?mail.com$/
    )
    if(!vEmail){
        return  res.status(400).send({err_msg:`Email is not valid`})
    }
    const availableEmail=(await authorModel.find().select({email:1,_id:0})).map((user)=>user.email)

    if(availableEmail.includes(req.body.email)){
        return  res.status(400).send({err_msg:`Email is already in use`})
    }
    next()
}
module.exports.autorValidator=autorValidator