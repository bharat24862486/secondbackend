
const express=require("express")
const { connection } = require("./dbs")
const { userRouter } = require("./routes/user.routes")
const cors=require("cors")
const app=express()
app.use(cors())

const jwt=require("jsonwebtoken")
const { userAuth } = require("./middleware/user.middleware")
const { NoteRouter } = require("./routes/Notes.route")
app.use(express.json())

app.get("/",(req,res)=>{
    req.send("home page")
})
app.use("/users",userRouter)
app.use(userAuth)

app.use("/notes",NoteRouter)




app.listen(4500,async ()=>{
try {
    await connection
    console.log("connected to db")
} catch (error) {
    console.log(error)
}

console.log("connection establisted at port 4500")
})