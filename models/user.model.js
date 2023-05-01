const mongoose = require("mongoose")

const users = mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    password:{type:String,required:true}
    
    
}, {versionKey:false})

const userSchema = mongoose.model("/users",users)

module.exports=userSchema