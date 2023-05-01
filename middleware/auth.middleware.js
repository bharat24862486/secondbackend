const jwt = require("jsonwebtoken")

const Auth = (req,res,next)=>{
    console.log("hello")
    let token = req.headers.authorization
    if (token) {
        token = token.split(" ")[1]
        jwt.verify(token, 'bharat', function (err, decoded) {
            if(decoded){
                console.log(decoded,"decoded")
                req.body.authorID = decoded.authorID
                req.body.authorName = decoded.authorName
                console.log("hello 2")
                
                next()
            } else{
                res.send({ "err": err.message })
            }
        });
        
    }else{
        res.send({"err":"provide authentication token"})
    }
}


module.exports = Auth