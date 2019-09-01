const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error")

const PORT = 8081;

app.use(cors()); //cors middleware
app.use(bodyParser.json); //we want to use json


app.use(function(req, res, next){
    //handle error routes
    let err = new Error("Not Found");
    err.status = 404
    next(err);
})

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on port: ${PORT}`);
})