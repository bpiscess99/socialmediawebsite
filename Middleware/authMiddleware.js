    const User = require("../models/userModel");
    const asynchandler = require("express-async-handler")
    const jwt = require("jsonwebtoken")


    const protect = asynchandler(async (req, res, next) => {
    // try {
    //     const token = req.cookies.token
    //     if(!token){
    //         res.status(401)
    //         throw new Error("Not authorized, please login")
    //     }

    //     // Verify token
    //     const verified = jwt.verify(token, process.env.JWT_SECRET)

    //     // Get user Id from Token
    //     const user = await User.findById(verified.id).select("-password")

    //     if(!user){
    //         res.status(401)
    //         throw new Error("User not found")
    //     }
    //     req.user = user;
    //     next()
                
    //     } catch (error) {
    //         res.status(401)
    //         throw new Error("Not authorized, Please login")
    //     }


const { authorization } = req.headers;
if (!authorization) {   
   return  res.status(401).json({error: "You must have logged in 1"})
}
const token = authorization.replace("Bearer ", "")
jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
   return res.status(401).json({error: "You must have logged in 1"})
   
    }
    const { id } = payload
    User.findById(id).then(userData => {
        req.user = userData
        next()
    })
})
})


module.exports = protect

