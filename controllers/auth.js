const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req,res,next) => {
    // TODO: POST DATA
    const name = "Alpvczazaer"
    const email = "alpfdvce77r1@alper.com"
    const password = "123"

    const user = await User.create({
        name,
        email,
        password
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