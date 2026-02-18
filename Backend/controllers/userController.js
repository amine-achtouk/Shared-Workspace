const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) =>{
    try{
        const { username, email, password } = req.body
        if(!username || !email || !password ) return res.status(400).json({ message : 'All fields required'})

        const existUser = await User.findOne({email})
        if(existUser) return res.status(409).json({ message : 'User Already exist'})

        const hashPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            username,
            email,
            password : hashPassword
        })

        const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET, {expiresIn : '3d'})

        res.status(201).json({
            message : 'Successfully created User',
            token : token,
            name : newUser.username,
            email : newUser.email
        })
    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}



const loginUser = async (req, res) =>{
    try{
        const { email, password } = req.body;
        if(!email || !password ) return res.status(400).json({ message : 'All fields required'})

        const findUser = await User.findOne({email})
        if(!findUser) return res.status(401).json({ message : 'Invalid email or password'})

        const isMatchPassword = await bcrypt.compare(password, findUser.password)
        if(!isMatchPassword) return res.status(401).json({ message : 'Invalid email or password'})

        const token = jwt.sign({id : findUser._id}, process.env.JWT_SECRET, {expiresIn : '3d'})

        res.status(200).json({
            message : 'Successfully logged in',
            token : token,
            name : findUser.username
        })
    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}

const getMe = async (req, res) =>{
    try{
        const userId = req.user.id

        const user = await User.findById(userId).select('-password')
        if(!user) return res.status(404).json({ message : 'user Not found'})

        res.status(200).json({
            user : {
                id : user._id,
                name : user.username,
                email : user.email
            }
        })
    }
    catch(err){
        res.status(500).json({ message : 'Server Error'})
    }
}

module.exports = { registerUser, loginUser, getMe }