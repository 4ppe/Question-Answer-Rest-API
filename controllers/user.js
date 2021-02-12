const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");

const getSingleUser = asyncHandler(async (req, res, next) => {

    const user = await req.data;

    return res.status(200)
        .json({
            succes: true,
            data: user
        });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
    return res.status(200).json(res.queryResults);
});

module.exports = {
    getSingleUser,
    getAllUsers
};