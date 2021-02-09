const User = require("../../models/User")
const Question = require("../../models/Question")
const Answer = require("../../models/Answer")
const CustomError = require("../../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");

const checkUserExist = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new CustomError("There is no such user with that id", 400))
    }
    req.data = user;
    next();
});

const checkQuestionExist = asyncHandler(async (req, res, next) => {
    const question_id = req.params.id || req.params.question_id;

    const question = await Question.findById(question_id);

    if (!question) {
        return next(new CustomError("There is no such question with that id", 400))
    }
    req.data = question;
    next();
});

const checkQuestionAndAnswerExist = asyncHandler(async (req, res, next) => {
    const question_id = req.params.question_id;
    const answer_id = req.params.answer_id;

    const answer = await Answer.findOne({
        _id: answer_id,
        question: question_id
    });

    if (!answer) {
        return next(new CustomError("There is no such answer", 400))
    }
    next();
});


module.exports = {
    checkUserExist,
    checkQuestionExist,
    checkQuestionAndAnswerExist
};