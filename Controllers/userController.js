const users = require('../Models/userSchema')

const jwt = require('jsonwebtoken')

exports.registerUser = async(req,res) => {
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json('user already exist')
        }
        else{
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}

exports.loginUser = async(req,res) =>{
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        console.log(existingUser);
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWTKEY)
            console.log(token);
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(406).json('user do not exist')
        }
    }
    catch(err){
        res.status(404).json('failed' + err)
    }
}