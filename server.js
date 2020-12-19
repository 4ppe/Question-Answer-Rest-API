const express = require('express');

const app = express();

const PORT = 5000 || process.env.PORT;

app.get("/",(req,res) => {

    res.send("my API");
});

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
});