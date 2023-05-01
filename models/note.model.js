const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    category:{type:String,required:true},
    authorID:{type:String,required:true},
    authorName:{type:String,required:true}

    
    
}, {versionKey:false})

const notesModel = mongoose.model("/notes",notesSchema)

module.exports=notesModel