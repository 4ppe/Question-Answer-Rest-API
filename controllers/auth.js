const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req,res,next) => {
    // TODO: POST DATA

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    res
    .status(200)
    .json({
        success: true,
        data: user
    })
})

// TEST
const errorTest = (req,res,next) => {
    return next(new TypeError('Custom Error Masage'))
}

module.exports = {
    register,
    errorTest
}