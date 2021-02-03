const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require('express-async-handler')
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers')
const {validateUserInput, comparePassword} = require ('../helpers/inputs/inputHelpers')

const register = asyncHandler(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    sendJwtToClient(user,res);
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if(!validateUserInput(email, password)){ 
        return next(new CustomError('Please check your input',400));
    }
   
    const user = await User.findOne({email}).select("+password");
    if(!comparePassword(password, user.password)){
        return next(new CustomError('Please check your credentials',400));
    }
    sendJwtToClient(user,res);

    console.log(user);
 

})

const getUser = asyncHandler(async (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })
})

const logout = asyncHandler(async (req, res, next) => {
    res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now())
    })
    .json({
        success: true,
        message: "Logout Successfull"
    })
})

const imageUpload = asyncHandler(async (req, res, next) => {
    res.status(200)
    .json({
        success: true,
        message: "Image Upload Successfull"
    });
});

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload
}