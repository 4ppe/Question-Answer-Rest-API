const Question = require("../models/Question");
const CustomError = require("../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");

const askNewQuestion = asyncHandler(async (req, res, next) => {
    const information = req.body;
    const question = await Question.create({
        ...information,
        user: req.user.id
    });
    res.status(200).json({
        success: true,
        data: question
    });
});


const getAllQuestions = asyncHandler(async (req, res, next) => {
    const questions = await Question.find();
    res.status(200).json({
        success: true,
        data: questions
    });
});


const getSingleQuestion = asyncHandler(async (req, res, next) => {
    const question = req.data;
    res.status(200).json({
        success: true,
        data: question
    });
});

const editQuestion = asyncHandler(async (req, res, next) => {
    const information = req.body;
    const {
        id
    } = req.params;

    let question = await Question.findById(id)

    question.title = information.title;
    question.content = information.content;
    question = await question.save();

    return res.status(200).json({
        success: true,
        data: question
    });
});

const deleteQuestion = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;

    await Question.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "Question delete operation succesfull"
    });
});

const likeQuestion = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;

    question = req.data;

    if (question.likes.includes(req.user.id)) {
        return next(new CustomError("You already liked this question", 400));
    }
    question.likes.push(req.user.id);
    await question.save();

    return res.status(200).json({
        success: true,
        data: question
    });
});

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion
};