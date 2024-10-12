const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const requireAuth = (req, res, next) => {
    
    // verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ error: "Authorization token required" })
    }

    const token = authorization.split(" ")[1]

    
      jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Forbidden" })
        }
        req.body._id = decoded._id
        req.user = await userModel.findOne({ _id: decoded._id }).select("_id")
      
        next()
    })
    


}
module.exports = requireAuth