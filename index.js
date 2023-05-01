
const express=require("express")
require("dotenv").config()
const cors=require("cors")
const { connection } = require("./dbs")
const { userRouter } = require("./routes/user.routes")
const noteRoute = require("./routes/note.route")
const Auth = require("./middleware/auth.middleware")
// const { connection } = require("./db")
// const noteRoute = require("./routes/note.route")
// const { userRouter } = require("./routes/user.route")
// const Auth = require("./middleware/Auth.middleware")
const app=express()
app.use(cors())



app.use(express.json())

app.get("/",(req,res)=>{
    res.json("home page")
})
app.use("/users",userRouter)
app.use(Auth)

app.use("/notes",noteRoute)




app.listen(4500,async ()=>{
try {
    await connection
    console.log("connected to db")
} catch (error) {
    console.log(error)
}

console.log("connection establisted at port 4500")
})