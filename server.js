const express = require('express');
const dotenv = require('dotenv')

// Environment Variables
dotenv.config({
    path : "./config/env/config.env"
});

const app = express();
const PORT = process.env.PORT;


app.get("/",(req,res) => {

    res.send("my API");
});


app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});