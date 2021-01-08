const express = require('express');
const dotenv = require('dotenv')
const routers = require('./routers/index');
const connectDatabase = require('./helpers/database/connectDatabase')

// Environment Variables
dotenv.config({
    path : "./config/env/config.env"
});

// MongoDB connection
connectDatabase()

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