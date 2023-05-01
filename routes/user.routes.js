
const express=require("express")
const { UserModel } = require("../models/user.model")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()
const bcrypt=require("bcrypt")



userRouter.post("/register",async(req,res)=>{
    let {name,email,password,age}=req.body
    let data=await UserModel.findOne({email})
if(data){
    console.log(data)
    res.send({"msg":'user already exist'})
}else{

    try{
        bcrypt.hash(password, 8, async (err, hash)=>{
        const user=new UserModel({name,email,password:hash,age})
        await user.save()
        res.send({"msg":"user Registered"})
        });
        }catch(err){
        res.send({"err":err.message})
        console.log(err)
        }
    }
})

userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body


// 9643704642 anas
    try {

        const user =  await UserModel.findOne({email})
        if(user){
       console.log(user,"line 32")
       bcrypt.compare(password, user.password, function(err, result) {
          if(result){
           const token=jwt.sign({authorID:user._id,author:user.name},"pankaj")
           res.status(200).send({"msg":"login succesfull","token":token})
          }else{
           res.status(200).send({"msg":"wrong Credentials"})
          }
       });  
        }
       } catch (error) {
           res.status(400).send({err:error.message})
       }







})




module.exports={
    userRouter
}