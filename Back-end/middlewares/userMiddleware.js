const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) =>{
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message : 'Not authorized'})

        const token = authHeader.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decode.id).select('-password')
        if(!user) return res.status(401).json({ message : 'User not authorized'})

        req.user = {
            id : user._id.toString(),
            name : user.username,
            email : user.email
        }

        next()
    }
    catch(err){
        res.status(401).json({ message : 'Invalid token'})
    }
}

module.exports = authMiddleware