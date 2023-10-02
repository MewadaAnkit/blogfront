const authController = require('express').Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

authController.post('/register', async (req, res) => {
    try {
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
           res.status(401).json("Already Registered. Try a different email")
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({...req.body, password: hashedPassword})

        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {})

        return res.status(201).json({user: others, token})
    } catch (error) {
         res.status(500).json(error)
    }
})

authController.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email})

         if (!user) {
            return res.status(404).json('user Not found')
         }

         const ispasswd = await bcrypt.compare(req.body.password, user.password);
         if (!ispasswd) {
            return  res.status(404).json('Invalid username or password')
         }

         const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

         //console.log('login success')
        res.cookie("accessToken", token, {
            httpOnly: true,
         }).status(200).json({user , token})

      } catch (err) {
         res.status(400).json("Something went Wrong");
         console.log(err)
      }
})

module.exports = authController