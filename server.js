const express = require('express');
const dotenv = require('dotenv')
const routers = require('./routers/index');
const connectDatabase = require('./helpers/database/connectDatabase')
const customErrorHandler = require('./middlewares/errors/customErrorHandler')

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

// Error handler
app.use(customErrorHandler)


app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});