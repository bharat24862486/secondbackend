const express = require("express")
const userSchema = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
    let data = await userSchema.find()
    res.send(data)
})

userRouter.post("/register", async (req, res) => {
    let { name, email, password } = req.body
    console.log(password)

    try {
        bcrypt.hash(password, 8, async (err, hash) => {
            const user = new userSchema({ name, email, password: hash })
            user.save()
            res.send("Registered")
        });
    } catch (err) {
        res.send("Error in registering the user")
        console.log(err)
    }

 
})



userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    console.log(email, password, "line 52")
    try {
        const ok = await userSchema.findOne({ email })
        if (ok) {


            console.log(ok)
            bcrypt.compare(password, ok.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ authorID: ok._id, authorName:ok.name }, 'bharat');
                // console.log(token)
                res.send({ "msg": "login Successfull", token })
            } else {
                res.send({ "err": "wrong credentials" })
            }
            // result == true
          });
        } else {
    res.send("invalid email and password")
}


    } catch (error) {
    res.send("error")
}
})



module.exports = {userRouter}