const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Tweet = require('../models/Tweet');
const TwitterUser = require('../models/TwitterUser');

function isValidTweet(tweet) {
        return tweet && tweet.toString().trim() !== '';
}
router.post("/twitter/tweets", async (req, res) => {
    try {
        const body = req.body.tweet;
        const user =  req.body.user;
        const replies = req.body.replies;
        if (isValidTweet(body)) {
            const tweet = new Tweet({
                body,
                user,
                replies
            });
            console.log(tweet);
            await tweet.save();
            return res.status(200).json({
                message: "Tweet Created!",
                success: true
        });
        } else {
            return res.status(401).json({
                message: "Tweet is empty!",
                success: false
        });
        }
    } catch(err) {
        return res.status(500).json({
            message: "something went wrong",
            success: false
        });
    }

});

router.get("/twitter/alltweets", (req, res) => {
    Tweet.find((err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
    });

router.post("/twitter/publishertweets", (req, res) => {
    Tweet.find(({user : req.body.id}), (err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

router.post("/twitter/timetweets", (req, res) => {
    Tweet.find(({user : req.body.id}), (err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

module.exports = router;