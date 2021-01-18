const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require('express-async-handler')
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers')

const register = asyncHandler(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    sendJwtToClient(user,res);
})

const tokenTest = asyncHandler(async (req, res, next) => {

    res.json({
        success: true,
        message: "welcome"
    })
})

module.exports = {
    register,
    tokenTest
}