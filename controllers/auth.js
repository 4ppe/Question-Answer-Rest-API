const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require ("../helpers/inputs/inputHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");

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
    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile_image" : req.savedProfileImage
    },{
        new: true,
        runValidators: true
    })
    res.status(200)
    .json({
        success: true,
        message: "Image Upload Successfull",
        data: user
    });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
    
    const resetEmail = req.body.email

    const user = await User.findOne({email: resetEmail})
    if(!user){
        return next(new CustomError("There is no user with that email",400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();

    const resetPasswordUrl = `http://localhost:5000/api/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
        <h3>Reset Your Password</h3>
        <p> This <a href = '${resetPasswordUrl}' target= '_blank'>link</a> will expire in 1 hour</p>
    `;

    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset Your Password",
            html: emailTemplate
        });
        res.status(200).json({
            success: true,
            message: "Token sent to your email",
            data: user
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        console.log(error)

        return next(new CustomError("Email Could Not Be Sent",500))
    }

 
});

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword
}