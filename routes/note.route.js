
const express=require("express")
const { NoteModel } = require("../models/notemodel")

const NoteRouter=express.Router()


NoteRouter.post("/add",async(req,res)=>{

    try {
        let user=new NoteModel(req.body)
        await user.save()
        res.send({"msg":"Notes added"})
    } catch (error) {
        res.send({"msg":error.message,"line":"28"})
    }

})



NoteRouter.get("/",async(req,res)=>{
    const {author}=req.body
try {
    let users= await NoteModel.find({author})
    res.send(users)
} catch (error) {
    res.send({"err":error.message})
}

})

NoteRouter.delete("/del/:id",async(req,res)=>{

    const {id}=req.params
    try {
        let user= await NoteModel.findByIdAndDelete({_id:id})
        res.send({"msg":"note deleted successfully"})
    } catch (error) {
        res.send({"err":error.message})
    }


})
NoteRouter.patch("/patch/:id",async(req,res)=>{

    const {id}=req.params
    console.log(req.body)
    try {
        let user= await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":"note updated successfully"})
    } catch (error) {
        res.send({"err":error.message})
    }


})


module.exports={
    NoteRouter
}