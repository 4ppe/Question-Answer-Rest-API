const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require('express-async-handler')
const sendJwtToClient = require('../helpers/authorization/sendJwtToClient')

const register = asyncHandler(async (req, res, next) => {

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    sendJwtToClient(user,res);
})

// TEST
const errorTest = (req,res,next) => {
    return next(new TypeError('Custom Error Masage'))
}

module.exports = {
    register,
    errorTest
}