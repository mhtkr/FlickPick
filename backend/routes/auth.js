const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: 'User Already Exist'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({email, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({token, email:newUser.email});
    
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid username or password'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({token, email: user.email});
    
    } catch (err) {
        res.status(500).json({message: err.message});
    }

});

module.exports = router;