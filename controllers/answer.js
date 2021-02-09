const Question = require("../models/Question")
const Answer = require("../models/Answer")
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");


const addNewAnswerToQuestion = asyncHandler(async (req, res, next) => {
    const information = req.body;
    const {
        question_id
    } = req.params;
    const answer = await Answer.create({
        ...information,
        user: req.user.id,
        question: question_id
    })
 
    res.status(200).json({
        success: true,
        data: answer
    });
});

module.exports = addNewAnswerToQuestion