const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const TwitterUser = require('../models/TwitterUser');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const pass = req.body.password;
    try {
    const password = await bcrypt.hash(pass, 12);

    const newUser = new TwitterUser({
      name,
      email,
      password
    });

    await newUser.save();

    return res.status(200).json({
        message: "Twitter user registered!",
        success: true
    });
    } catch(err) {
        console.log("error")
        console.log(err)
        return res.status(500).json({
            message: "something went wrong",
            success: false
        });
    }

});

router.post('/signin', async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const user = await TwitterUser.findOne({ email });
    console.log(user);
    if(!user) {
        return res.status(404).json({
            message: "Email or password not correct, please check again",
            success: false
        });
    }
    // We can add here the role choices to where to direct etc
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        let token = jwt.sign({
            user_email: user.email
        },
        'h3110',
        { expiresIn: "1 day"}
        );
        let result = {
            redirect: "/",
            user: user,
            email: user.email,
            token,
            expiresIn: 24
        };

        return res.status(200).json({
            ...result,
            message: "You are logged in!",
            success: true
        })

    } else {
        return res.status(404).json({
            redirect: "/signin",
            message: "Email or password not correct, please check again",
            success: false
        });
    }
});

module.exports = router;