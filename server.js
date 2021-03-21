var express = require("express")
//4DQmTR3UoJiOn35z
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors  = require("cors");

var Cards = require("./models/Tweet");

var app = express();

var port = process.env.port || 8080;

var connection_url = 'mongodb+srv://admin:4DQmTR3UoJiOn35z@cluster0.rnbkq.mongodb.net/PINDER?retryWrites=true&w=majority'

app.use(express.json());
//app.use(express.static(path.join(__dirname, "build")))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then((res) => console.log("connected to db"));

app.get("/", (req, res) => res.status(200).send("hello"));

app.use("/", require('./routes/Tweet'));
app.use("/", require('./routes/Auth'));

app.listen(port, () => console.log("listening to port "+port));
