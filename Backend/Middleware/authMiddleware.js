const jwt = require('jsonwebtoken')
const userModel = require('../Model/userSchema')

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.SCRET_KEY)

            req.user = await userModel.findById(decode.id).select("-password")
        
        next()
    } catch (error) {
        res.status(400)
        throw new Error("User Not Authorised")
    }
   }

   if(!token){
    res.status(400)
        throw new Error("User Not Authorised : Token Not Passed")
   }
}

