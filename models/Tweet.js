const {Schema, model} = require('mongoose');

const Tweet = Schema({
    body: String,
    user: Schema.Types.ObjectId,
    tweetedOn: {
        type: Date,
        default: Date.now(),
        required: true
    },
    replies: [{type: Schema.Types.ObjectId, ref: 'tweets'}]
})

module.exports = model("tweets", Tweet);