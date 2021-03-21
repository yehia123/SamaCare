const {Schema, model} = require('mongoose');

const TwitterUser = Schema({
    name: String,
    email: String,
    password: String,
    tweet: Schema.Types.ObjectId

})

module.exports = model("twitterusers", TwitterUser);