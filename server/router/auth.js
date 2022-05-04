const express = require('express');
const jwt = require("jsonwebtoken")
const router = express.Router();
const bcrypt = require("bcryptjs")
const dotenv = require('dotenv');

const User = require('../models/userSchema');
const authenticate = require('../middleware/authenticate');

router.get('/he' , (req, res) => {
    res.send('hello world from the server router');
})

router.post('/register' , async (req, res) => {
    console.log(req.body);
    const { name, email, password, cpassword } = req.body;

    if(!name || !email || !password || !cpassword){
       return res.status(422).json({ error : 'pls fill the field'});
    }
    
    try {
        const userExist = await User.findOne({ email : email })

        if(userExist){
            return res.status(422).json({ error : 'Email already exist'});
        }else if(password != cpassword){
            return res.status(422).json({ error : 'password mismatched'});   
        }else{
            const user = new User({ name, email, password, cpassword});
            await user.save()
            res.status(201).json({ error : 'added successfully'});
        }
    } catch (error) {
        console.log('this is error');
    }
})

router.post('/signin' , async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
           return res.status(400).json({ error : 'Invalid cred'});
        }

        const emailVal = await User.findOne({ email : email });
        
        if(emailVal){
           const passwordVal = await bcrypt.compare(password , emailVal.password);
            if( passwordVal ){

                let signedtoken = jwt.sign({ name: emailVal.name }, process.env.SECURITY_KEY, { expiresIn: 300 })
                res.status(200).send({ message: "login successfully", token: signedtoken, user: emailVal })

                //res.status(200).json({ error : 'login success'});
                console.log('login success');
            }
            else{
                res.status(422).json({ error : 'password missmatch'});
            }
        }else{
            res.status(422).json({ error : 'email missmatch'});
        }  
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
