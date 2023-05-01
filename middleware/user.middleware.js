
const jwt=require("jsonwebtoken")

const userAuth=(req,res,next)=>{
    let token=req.headers.authorization
    const {name,_id}=req.body
    if(token){
        token=token.split(" ")[1]
        jwt.verify(token,"pankaj",(err,decoded)=>{
            if(decoded){
                console.log(decoded,"line 11")
                req.body.authorID=decoded.authorID
                req.body.author=decoded.author
               next()
            }else{
                res.send({"err":err.message})
            }
        })
    }
    else{
        res.send({"err":"please provide token"})
    }

}

module.exports={
    userAuth
}