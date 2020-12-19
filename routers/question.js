// api/questions

const express = require('express');
const router = express.Router();

router.get("/",(req,res) => {
    res.send("questions home page")
})

router.get("/delete",(req,res) => {
    res.send("delete questions page")
})


module.exports = router;
