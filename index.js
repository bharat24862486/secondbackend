
const express=require("express")
require("dotenv").config()
const cors=require("cors")
// const { connection } = require("./db")
// const noteRoute = require("./routes/note.route")
// const { userRouter } = require("./routes/user.route")
// const Auth = require("./middleware/Auth.middleware")
const { userRouter } = require("./routes/user.routes")
const { NoteRouter } = require("./routes/Notes.route")
const { userAuth } = require("./middleware/user.middleware")
const { connection } = require("./dbs")
const app=express()
app.use(cors())



app.use(express.json())

app.get("/",(req,res)=>{
    res.json("home page")
})
app.use("/users",userRouter)
app.use(userAuth)

app.use("/notes",NoteRouter)


// let port = process.env.port

app.listen(8080,async ()=>{
try {
    await connection
    console.log("connected to db")
} catch (error) {
    console.log(error)
}

console.log("connection establisted at port 8080")
})