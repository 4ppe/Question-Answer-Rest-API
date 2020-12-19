const express = require('express');
const dotenv = require('dotenv')
const routers = require('./routers/index');


// Environment Variables
dotenv.config({
    path : "./config/env/config.env"
});

const app = express();
const PORT = process.env.PORT;

// Routers Middlewares
app.use("/api",routers);


app.get("/",(req,res) => {
    res.send("my API");
});


app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});